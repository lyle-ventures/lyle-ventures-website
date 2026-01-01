/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk,md,js}"],
  theme: {
    extend: {
      colors: {
        // Primary palette (Option A - Pure Dark)
        'lv-bg': '#08080c',
        'lv-bg-secondary': '#111118',
        'lv-accent': '#6366f1',
        
        // Sector colors (locked)
        'sector-ai': '#00D4FF',
        'sector-defense': '#FF3366',
        'sector-energy': '#00FF88',
        'sector-bio': '#FFB800',
        'sector-crypto': '#AA66FF',
        'sector-education': '#FF6B35',
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'mono': ['"SF Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.15em',
      },
      lineHeight: {
        'none': '1',
        'tight': '0.95',
        'snug': '1.1',
      },
    },
  },
  plugins: [],
}
