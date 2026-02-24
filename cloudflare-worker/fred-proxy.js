/**
 * Cloudflare Worker: FRED API Proxy v2.1
 *
 * Deploy to Cloudflare Workers to proxy FRED API requests and avoid CORS issues.
 *
 * CHANGELOG v2.1:
 * - Added stale-while-revalidate caching
 * - Added error details in response
 * - Added version header
 *
 * Setup:
 * 1. Go to Cloudflare Dashboard > Workers & Pages
 * 2. Create new Worker
 * 3. Paste this code
 * 4. Add environment variable: FRED_API_KEY = your_api_key
 * 5. Deploy and note the worker URL (e.g., fred-proxy.your-subdomain.workers.dev)
 * 6. Update macro.njk to use: https://fred-proxy.your-subdomain.workers.dev
 */

const FRED_API_BASE = 'https://api.stlouisfed.org/fred';

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health') {
      return jsonResponse({ status: 'ok', version: '2.1', timestamp: new Date().toISOString() });
    }

    // Get series ID from query params
    const seriesId = url.searchParams.get('series_id');
    if (!seriesId) {
      return jsonResponse({ error: 'Missing series_id parameter' }, 400);
    }

    // Build FRED API URL
    const fredUrl = new URL(`${FRED_API_BASE}/series/observations`);
    fredUrl.searchParams.set('series_id', seriesId);
    fredUrl.searchParams.set('api_key', env.FRED_API_KEY);
    fredUrl.searchParams.set('file_type', 'json');
    fredUrl.searchParams.set('sort_order', 'desc');
    fredUrl.searchParams.set('limit', url.searchParams.get('limit') || '10');

    // Optional date filters
    if (url.searchParams.get('observation_start')) {
      fredUrl.searchParams.set('observation_start', url.searchParams.get('observation_start'));
    }
    if (url.searchParams.get('observation_end')) {
      fredUrl.searchParams.set('observation_end', url.searchParams.get('observation_end'));
    }

    try {
      const response = await fetch(fredUrl.toString());
      const data = await response.json();

      // Check for FRED API errors
      if (data.error_message) {
        return jsonResponse({
          series_id: seriesId,
          observations: [],
          error: data.error_message,
          fred_error_code: data.error_code
        }, 200); // Return 200 but with error info so client can handle gracefully
      }

      return jsonResponse({
        series_id: seriesId,
        observations: data.observations || [],
        count: data.observations?.length || 0
      }, 200);
    } catch (error) {
      return jsonResponse({ 
        error: 'Failed to fetch from FRED API',
        message: error.message,
        series_id: seriesId
      }, 500);
    }
  }
};

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // Updated: shorter cache with stale-while-revalidate for fresher data
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
      'X-Proxy-Version': '2.1'
    }
  });
}
