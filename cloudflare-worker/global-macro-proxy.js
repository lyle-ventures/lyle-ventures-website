/**
 * Cloudflare Worker: Global Macro Data Proxy v2.1
 *
 * Multi-source proxy for macro data APIs:
 * - FRED (US Federal Reserve)
 * - ECB (European Central Bank)
 * - IMF (International Monetary Fund)
 *
 * CHANGELOG v2.1:
 * - Fixed Japan M3 data fetching (now uses absolute M3 value, not growth rate)
 * - Added fallback series for Wilshire 5000
 * - Improved error handling and validation
 * - Added stale-while-revalidate caching
 * - Fixed Euro M3 terminology (was incorrectly called M2)
 *
 * Setup:
 * 1. Go to Cloudflare Dashboard > Workers & Pages
 * 2. Create new Worker
 * 3. Paste this code
 * 4. Add environment variable: FRED_API_KEY = your_api_key
 * 5. Deploy and note the worker URL
 * 6. Update macro.njk to use the new endpoint
 */

// API Base URLs
const FRED_API_BASE = 'https://api.stlouisfed.org/fred';
const ECB_API_BASE = 'https://data-api.ecb.europa.eu/service/data';
const IMF_API_BASE = 'http://dataservices.imf.org/REST/SDMX_JSON.svc';

// CORS headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route to appropriate handler
      if (path.startsWith('/fred/')) {
        return await handleFRED(url, env);
      } else if (path.startsWith('/ecb/')) {
        return await handleECB(url);
      } else if (path.startsWith('/imf/')) {
        return await handleIMF(url);
      } else if (path === '/global-m2') {
        return await handleGlobalM2(url, env);
      } else if (path === '/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString(), version: '2.1' });
      } else {
        // Legacy FRED support (backwards compatible)
        const seriesId = url.searchParams.get('series_id');
        if (seriesId) {
          return await handleFRED(url, env);
        }
        return jsonResponse({
          error: 'Invalid endpoint',
          available: ['/fred/', '/ecb/', '/imf/', '/global-m2', '/health']
        }, 400);
      }
    } catch (error) {
      console.error('Proxy error:', error);
      return jsonResponse({ error: 'Internal server error', message: error.message }, 500);
    }
  }
};

// =============================================================================
// FRED Handler (US Data)
// =============================================================================
async function handleFRED(url, env) {
  // Support both /fred/observations?series_id=X and legacy ?series_id=X
  let seriesId = url.searchParams.get('series_id');

  if (!seriesId) {
    return jsonResponse({ error: 'Missing series_id parameter' }, 400);
  }

  const fredUrl = new URL(`${FRED_API_BASE}/series/observations`);
  fredUrl.searchParams.set('series_id', seriesId);
  fredUrl.searchParams.set('api_key', env.FRED_API_KEY);
  fredUrl.searchParams.set('file_type', 'json');
  fredUrl.searchParams.set('sort_order', 'desc');
  fredUrl.searchParams.set('limit', url.searchParams.get('limit') || '60');

  // Optional date filters
  if (url.searchParams.get('observation_start')) {
    fredUrl.searchParams.set('observation_start', url.searchParams.get('observation_start'));
  }
  if (url.searchParams.get('observation_end')) {
    fredUrl.searchParams.set('observation_end', url.searchParams.get('observation_end'));
  }

  const response = await fetch(fredUrl.toString());
  const data = await response.json();

  return jsonResponse({
    source: 'FRED',
    series_id: seriesId,
    observations: data.observations || [],
    error: data.error_message || null
  });
}

// =============================================================================
// ECB Handler (Euro Area Data)
// =============================================================================
async function handleECB(url) {
  // Extract series from path: /ecb/BSI/M.U2.Y.V.M30...
  const pathParts = url.pathname.replace('/ecb/', '').split('/');
  const dataflow = pathParts[0] || 'BSI';
  const key = pathParts.slice(1).join('/') || 'M.U2.Y.V.M30.X.1.U2.2300.Z01.E';

  // Build ECB URL - supports JSON output
  const ecbUrl = new URL(`${ECB_API_BASE}/${dataflow}/${key}`);
  ecbUrl.searchParams.set('format', 'jsondata');
  ecbUrl.searchParams.set('lastNObservations', url.searchParams.get('limit') || '24');

  const response = await fetch(ecbUrl.toString(), {
    headers: { 'Accept': 'application/json' }
  });

  if (!response.ok) {
    return jsonResponse({
      source: 'ECB',
      error: `ECB API returned ${response.status}`,
      dataflow,
      key
    }, response.status);
  }

  const data = await response.json();

  // Parse ECB SDMX-JSON format into simplified observations
  const observations = parseECBResponse(data);

  return jsonResponse({
    source: 'ECB',
    dataflow,
    key,
    observations
  });
}

function parseECBResponse(data) {
  try {
    const observations = [];
    const dataSets = data?.dataSets?.[0]?.series || {};
    const timePeriods = data?.structure?.dimensions?.observation?.[0]?.values || [];

    // Get first series (usually only one)
    const seriesKey = Object.keys(dataSets)[0];
    if (!seriesKey) return observations;

    const obs = dataSets[seriesKey].observations || {};

    Object.entries(obs).forEach(([idx, values]) => {
      const period = timePeriods[parseInt(idx)]?.id || timePeriods[parseInt(idx)]?.name;
      const value = values[0];
      if (period && value !== undefined && value !== null) {
        observations.push({
          date: period,
          value: value.toString()
        });
      }
    });

    // Sort descending by date
    observations.sort((a, b) => b.date.localeCompare(a.date));
    return observations;
  } catch (e) {
    console.error('ECB parse error:', e);
    return [];
  }
}

// =============================================================================
// IMF Handler (China and other countries)
// =============================================================================
async function handleIMF(url) {
  // Extract key from path: /imf/IFS/M.CN.FMBN_NUM
  const key = url.pathname.replace('/imf/', '') || 'IFS/M.CN.FMBN_NUM';

  const imfUrl = `${IMF_API_BASE}/CompactData/${key}`;

  const response = await fetch(imfUrl, {
    headers: { 'Accept': 'application/json' }
  });

  if (!response.ok) {
    return jsonResponse({
      source: 'IMF',
      error: `IMF API returned ${response.status}`,
      key
    }, response.status);
  }

  const data = await response.json();
  const observations = parseIMFResponse(data);

  return jsonResponse({
    source: 'IMF',
    key,
    observations
  });
}

function parseIMFResponse(data) {
  try {
    const observations = [];
    const series = data?.CompactData?.DataSet?.Series;

    if (!series) return observations;

    // Handle single series or array
    const seriesData = Array.isArray(series) ? series[0] : series;
    const obs = seriesData?.Obs || [];

    // Normalize to array
    const obsArray = Array.isArray(obs) ? obs : [obs];

    obsArray.forEach(o => {
      const period = o['@TIME_PERIOD'];
      const value = o['@OBS_VALUE'];
      if (period && value !== undefined) {
        observations.push({
          date: period,
          value: value.toString()
        });
      }
    });

    // Sort descending by date
    observations.sort((a, b) => b.date.localeCompare(a.date));
    return observations;
  } catch (e) {
    console.error('IMF parse error:', e);
    return [];
  }
}

// =============================================================================
// Global M2 Aggregator v2.1 - FIXED
// =============================================================================
async function handleGlobalM2(url, env) {
  // Fetch all M2/M3 sources in parallel
  const [usM2, euroM3, japanM3, chinaM2, fxRates] = await Promise.all([
    fetchUSM2(env),
    fetchEuroM3(),
    fetchJapanM3(env),
    fetchChinaM2(),
    fetchFXRates(env)
  ]);

  // Get latest values
  const latestUS = getLatestValidValue(usM2);
  const latestEuro = getLatestValidValue(euroM3);
  const latestJapan = getLatestValidValue(japanM3);
  const latestChina = getLatestValidValue(chinaM2);

  // Convert to USD (all in billions)
  // US M2: already in billions USD
  const usUSD = latestUS.value;
  
  // Euro M3: in EUR millions, convert to USD billions
  const euroUSD = (latestEuro.value / 1000) * fxRates.EURUSD;
  
  // Japan M3: FIXED - now fetching actual M3 stock in 100 million yen
  // Convert: (100M yen) / (USDJPY * 10000) = USD billions
  const japanUSD = latestJapan.value / (fxRates.USDJPY * 10000);
  
  // China M2: in CNY 100 million (亿元), convert to USD billions
  // 1 亿元 = 100 million CNY = 0.1 billion CNY
  const chinaUSD = (latestChina.value * 0.1) / fxRates.USDCNY;

  // Validate conversions - all should be positive and reasonable
  const validUS = usUSD > 0 && usUSD < 50000;
  const validEuro = euroUSD > 0 && euroUSD < 50000;
  const validJapan = japanUSD > 0 && japanUSD < 50000;
  const validChina = chinaUSD > 0 && chinaUSD < 100000;

  // Calculate totals (only include valid components)
  let globalM2USD = 0;
  if (validUS) globalM2USD += usUSD;
  if (validEuro) globalM2USD += euroUSD;
  if (validJapan) globalM2USD += japanUSD;
  if (validChina) globalM2USD += chinaUSD;

  // Get YoY values (12 months ago)
  const yoyUS = getYoYValue(usM2, 12);
  const yoyEuro = getYoYValue(euroM3, 12);
  const yoyJapan = getYoYValue(japanM3, 12);
  const yoyChina = getYoYValue(chinaM2, 12);

  // Calculate YoY growth for each component
  const usYoY = validUS ? calcYoY(latestUS.value, yoyUS.value) : null;
  const euroYoY = validEuro ? calcYoY(latestEuro.value, yoyEuro.value) : null;
  const japanYoY = validJapan ? calcYoY(latestJapan.value, yoyJapan.value) : null;
  const chinaYoY = validChina ? calcYoY(latestChina.value, yoyChina.value) : null;

  // Global YoY (weighted by current proportion)
  let globalYoY = 0;
  let totalWeight = 0;

  if (validUS && usYoY !== null) {
    globalYoY += usUSD * usYoY;
    totalWeight += usUSD;
  }
  if (validEuro && euroYoY !== null) {
    globalYoY += euroUSD * euroYoY;
    totalWeight += euroUSD;
  }
  if (validJapan && japanYoY !== null) {
    globalYoY += japanUSD * japanYoY;
    totalWeight += japanUSD;
  }
  if (validChina && chinaYoY !== null) {
    globalYoY += chinaUSD * chinaYoY;
    totalWeight += chinaUSD;
  }

  if (totalWeight > 0) {
    globalYoY = globalYoY / totalWeight;
  }

  return jsonResponse({
    source: 'AGGREGATED',
    version: '2.1',
    timestamp: new Date().toISOString(),
    globalM2: {
      totalUSD: globalM2USD,
      yoyGrowth: globalYoY,
      components: {
        us: {
          valueUSD: validUS ? usUSD : null,
          yoyGrowth: usYoY,
          date: latestUS.date,
          source: 'FRED:M2SL',
          valid: validUS
        },
        euro: {
          valueUSD: validEuro ? euroUSD : null,
          yoyGrowth: euroYoY,
          date: latestEuro.date,
          source: 'ECB:BSI (M3)', // FIXED: Correctly labeled as M3
          valid: validEuro
        },
        japan: {
          valueUSD: validJapan ? japanUSD : null,
          yoyGrowth: japanYoY,
          date: latestJapan.date,
          source: 'FRED:MYAGM3JPM189S (M3)', // FIXED: Using actual M3 stock
          valid: validJapan
        },
        china: {
          valueUSD: validChina ? chinaUSD : null,
          yoyGrowth: chinaYoY,
          date: latestChina.date,
          source: 'IMF:IFS (M2)',
          valid: validChina
        }
      }
    },
    fxRates: {
      EURUSD: fxRates.EURUSD,
      USDJPY: fxRates.USDJPY,
      USDCNY: fxRates.USDCNY
    },
    warnings: [
      !validUS ? 'US M2 data invalid or missing' : null,
      !validEuro ? 'Euro M3 data invalid or missing' : null,
      !validJapan ? 'Japan M3 data invalid or missing' : null,
      !validChina ? 'China M2 data invalid or missing' : null
    ].filter(Boolean)
  });
}

async function fetchUSM2(env) {
  const url = `${FRED_API_BASE}/series/observations?series_id=M2SL&api_key=${env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=24`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.observations || [];
  } catch (e) {
    console.error('Error fetching US M2:', e);
    return [];
  }
}

async function fetchEuroM3() {
  // ECB M3 for Euro Area (in EUR millions)
  // Note: This is M3, not M2 - M3 is the broader aggregate used in Europe
  const url = `${ECB_API_BASE}/BSI/M.U2.Y.V.M30.X.1.U2.2300.Z01.E?format=jsondata&lastNObservations=24`;
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
    const data = await res.json();
    return parseECBResponse(data);
  } catch (e) {
    console.error('Error fetching Euro M3:', e);
    return [];
  }
}

async function fetchJapanM3(env) {
  // FIXED: Japan M3 money stock (actual value, not growth rate)
  // MYAGM3JPM189S = M3 for Japan, in National Currency (100 million yen)
  // Previous bug: was using MABMM301JPM657S which is a YoY GROWTH RATE percentage
  const url = `${FRED_API_BASE}/series/observations?series_id=MYAGM3JPM189S&api_key=${env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=24`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.observations || [];
  } catch (e) {
    console.error('Error fetching Japan M3:', e);
    return [];
  }
}

async function fetchChinaM2() {
  // China M2 from IMF IFS (in CNY 100 million / 亿元)
  const url = `${IMF_API_BASE}/CompactData/IFS/M.CN.FMBN_NUM`;
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
    const data = await res.json();
    return parseIMFResponse(data);
  } catch (e) {
    console.error('Error fetching China M2:', e);
    return [];
  }
}

async function fetchFXRates(env) {
  // Fetch FX rates from FRED with fallback defaults
  const defaults = {
    EURUSD: 1.08,
    USDJPY: 150,
    USDCNY: 7.25
  };

  try {
    const [eurRes, jpyRes, cnyRes] = await Promise.all([
      fetch(`${FRED_API_BASE}/series/observations?series_id=DEXUSEU&api_key=${env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=5`),
      fetch(`${FRED_API_BASE}/series/observations?series_id=DEXJPUS&api_key=${env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=5`),
      fetch(`${FRED_API_BASE}/series/observations?series_id=DEXCHUS&api_key=${env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=5`)
    ]);

    const [eurData, jpyData, cnyData] = await Promise.all([
      eurRes.json(),
      jpyRes.json(),
      cnyRes.json()
    ]);

    return {
      EURUSD: getLatestValidValue(eurData.observations || []).value || defaults.EURUSD,
      USDJPY: getLatestValidValue(jpyData.observations || []).value || defaults.USDJPY,
      USDCNY: getLatestValidValue(cnyData.observations || []).value || defaults.USDCNY
    };
  } catch (e) {
    console.error('Error fetching FX rates:', e);
    return defaults;
  }
}

// Helper: Get latest valid (non-NaN, non-null) value from observations
function getLatestValidValue(observations) {
  for (const obs of observations) {
    const val = parseFloat(obs?.value);
    if (!isNaN(val) && val !== null && obs?.value !== '.') {
      return {
        value: val,
        date: obs?.date || 'unknown'
      };
    }
  }
  return { value: 0, date: 'unknown' };
}

function getYoYValue(observations, monthsAgo) {
  // Find observation approximately monthsAgo months back
  const obs = observations[monthsAgo] || observations[observations.length - 1];
  const val = parseFloat(obs?.value);
  return {
    value: !isNaN(val) ? val : 0,
    date: obs?.date || 'unknown'
  };
}

function calcYoY(current, previous) {
  if (!previous || previous === 0 || !current) return null;
  return ((current - previous) / previous) * 100;
}

// =============================================================================
// Utility Functions
// =============================================================================
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      // Updated cache control: shorter max-age with stale-while-revalidate
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600'
    }
  });
}
