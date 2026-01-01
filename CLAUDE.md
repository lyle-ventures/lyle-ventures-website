# CLAUDE.md — Lyle Ventures Website

## Overview

This is the website for **Lyle Ventures**, a venture capital firm founded by **Ethan Lyle** that invests in frontier technology companies across six sectors: AI, Crypto, Defense, Education, Energy, and Biomedical/Health.

**Live site**: https://lyle-ventures.xyz  
**Founder**: Ethan Lyle  
**Email**: ethan@lyle-ventures.xyz

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Static Site Generator | Eleventy (11ty) v2.0 |
| CSS Framework | Tailwind CSS v3.4 |
| Templating | Nunjucks (.njk) |
| Hosting | Netlify |
| Version Control | GitHub |

---

## Project Structure

```
lyle-ventures/
├── src/
│   ├── _includes/layouts/    # Page templates
│   │   └── base.njk          # Base HTML layout
│   ├── _data/                # Data files
│   │   ├── site.js           # Site metadata
│   │   └── portfolio.js      # Portfolio companies
│   ├── pages/                # Page content
│   │   ├── portfolio.njk
│   │   ├── thesis.njk
│   │   ├── contact.njk
│   │   └── admin.njk         # Portfolio admin (password protected)
│   ├── css/
│   │   ├── input.css         # Tailwind source
│   │   └── output.css        # Compiled CSS
│   └── index.njk             # Homepage
├── logos/                    # Brand assets (SVG + PNG)
├── .eleventy.js              # Eleventy config
├── tailwind.config.js        # Tailwind config
├── netlify.toml              # Netlify build config
├── package.json
└── CLAUDE.md                 # This file
```

---

## Key Commands

```bash
# Install dependencies
npm install

# Development (watch mode)
npm start

# Build for production
npm run build

# Build CSS only
npm run build:css

# Build 11ty only
npm run build:11ty
```

---

## Design System

### Colors

```javascript
// Primary palette
'lv-bg': '#08080c',           // Near-black background
'lv-bg-secondary': '#111118', // Card/section backgrounds
'lv-accent': '#6366f1',       // Indigo accent

// Sector colors (locked)
'sector-ai': '#00D4FF',       // Cyan
'sector-defense': '#FF3366',  // Magenta-red
'sector-energy': '#00FF88',   // Bright green
'sector-bio': '#FFB800',      // Gold
'sector-crypto': '#AA66FF',   // Purple
'sector-education': '#FF6B35' // Orange
```

### Typography

- **Headlines**: System sans, font-weight 300, uppercase, letter-spacing -0.02em
- **Labels**: SF Mono, uppercase, letter-spacing 0.15em, 50% opacity
- **Body**: System sans, font-weight 400
- **Company names**: System sans, font-weight 900, uppercase, letter-spacing -0.03em

### Logo

The logo is a Box + Dot hybrid: `[LV] Lyle.Ventures`

- Box: 32px square with 1.5px white border, "LV" centered
- Dot: Indigo (#6366f1) or white, with custom kerning
- Wordmark: Semibold, tight tracking

Logo variants available:
- `lyle-ventures-indigo-dark.svg` — Primary (dark backgrounds)
- `lyle-ventures-white-dark.svg` — All white (dark backgrounds)
- `lyle-ventures-mono-dark.svg` — Monochrome (dark backgrounds)
- `lyle-ventures-black-light.svg` — Black (light backgrounds)
- `lv-icon-*.svg` — Icon-only versions

---

## Data Management

### Portfolio Companies

Edit `src/_data/portfolio.js`:

```javascript
module.exports = [
  {
    name: "Company Name",
    sector: "AI",           // AI, Crypto, Defense, Education, Energy, Biomedical
    code: "AI",             // 2-3 letter code
    color: "#00D4FF",       // Sector color
    description: "Brief description.",
    url: "https://example.com"  // or null for stealth
  },
  // ...
];
```

### Admin Interface

Visit `/admin/` for a visual portfolio editor:
- Password: `lyleventures2025` (change in admin.njk)
- Drag to reorder
- Add/edit/delete companies
- Export updated JSON

---

## Pages

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/` | Hero, portfolio preview, thesis preview |
| Portfolio | `/portfolio/` | Full portfolio grid with sector filters |
| Thesis | `/thesis/` | Investment philosophy, criteria |
| Contact | `/contact/` | Contact info, pitch guidelines |
| Admin | `/admin/` | Portfolio management (password protected) |

---

## Common Tasks

### Add a new portfolio company

1. Edit `src/_data/portfolio.js`
2. Add new object with name, sector, code, color, description, url
3. Run `npm run build` and push to GitHub

Or use the admin interface at `/admin/`

### Change site metadata

Edit `src/_data/site.js` for title, description, URL, sectors.

### Update styling

1. Edit `src/css/input.css` for component styles
2. Edit `tailwind.config.js` for design tokens
3. Run `npm run build:css`

### Deploy changes

Push to GitHub → Netlify auto-deploys from `main` branch.

---

## SEO & Metadata

- Title format: `{Page Title} | Lyle Ventures`
- Meta description set per page in frontmatter
- robots.txt allows all crawlers
- llms.txt provides AI-readable site summary
- Open Graph tags in base template

---

## Contact

**Ethan Lyle**  
Founder & Managing Partner  
ethan@lyle-ventures.xyz  
https://www.linkedin.com/in/ethanlyle/

---

## Notes for Claude

When making changes to this codebase:

1. **Test locally first**: Run `npm start` before committing
2. **Preserve design tokens**: Don't change colors in tailwind.config.js without explicit approval
3. **Keep it simple**: This is a static site—no databases, no complex build steps
4. **Mobile-first**: All templates use responsive Tailwind classes
5. **SEO matters**: Maintain meta tags and semantic HTML
