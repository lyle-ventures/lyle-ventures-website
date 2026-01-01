# Lyle Ventures Website

A static site built with 11ty (Eleventy) and Tailwind CSS, deployed on Netlify.

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm start

# Production build
npm run build
```

---

## Migration from Squarespace

### Step 1: Create GitHub Repository

```bash
# Create a new repo on GitHub called "lyle-ventures"
# Clone it locally:
git clone https://github.com/YOUR_USERNAME/lyle-ventures.git
cd lyle-ventures

# Unzip the site files into this directory
```

### Step 2: Install & Test Locally

```bash
# Ensure Node.js v18+ is installed
node --version

# Install dependencies
npm install

# Build and run
npm run build:css
npm start

# Visit http://localhost:8080
```

### Step 3: Deploy to Netlify

**Option A: GitHub Integration (Recommended)**

1. Go to [netlify.com](https://netlify.com) → Sign in
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub → Select `lyle-ventures` repository
4. Netlify auto-detects settings from `netlify.toml`
5. Click "Deploy site"

**Option B: Netlify CLI**

```bash
npm install -g netlify-cli
netlify login
netlify init
npm run build
netlify deploy --prod
```

### Step 4: Configure Custom Domain

1. Netlify dashboard → "Site settings" → "Domain management"
2. Click "Add custom domain" → Enter `lyle-ventures.xyz`
3. Update DNS:
   - **Netlify DNS**: Point nameservers to Netlify
   - **External DNS**: Add CNAME record to your Netlify subdomain

### Step 5: Decommission Squarespace

1. Verify new site works at custom domain
2. Remove domain from Squarespace
3. Cancel Squarespace subscription

---

## Project Structure

```
lyle-ventures/
├── src/
│   ├── _includes/layouts/
│   │   └── base.njk          # Base HTML template
│   ├── _data/
│   │   ├── site.js           # Site metadata
│   │   └── portfolio.js      # Portfolio companies
│   ├── pages/
│   │   ├── portfolio.njk
│   │   ├── thesis.njk
│   │   ├── contact.njk
│   │   └── admin.njk         # Portfolio admin (password protected)
│   ├── css/
│   │   ├── input.css         # Tailwind source
│   │   └── output.css        # Compiled CSS
│   ├── index.njk             # Homepage
│   ├── robots.txt
│   └── llms.txt              # AI-readable site info
├── logos/                    # Brand assets (SVG + PNG)
├── .eleventy.js
├── tailwind.config.js
├── netlify.toml
├── CLAUDE.md                 # AI assistant documentation
└── package.json
```

---

## Logo Assets

### Full Logos

| File | Background | Description |
|------|------------|-------------|
| `lyle-ventures-indigo-dark.svg` | Dark | Primary — indigo dot |
| `lyle-ventures-white-dark.svg` | Dark | All white |
| `lyle-ventures-mono-dark.svg` | Dark | Monochrome (muted dot) |
| `lyle-ventures-black-light.svg` | Light | Black version |

### Icons

| File | Description |
|------|-------------|
| `lv-icon-white.svg` | White icon for dark backgrounds |
| `lv-icon-black.svg` | Black icon for light backgrounds |
| `lv-icon-indigo.svg` | Indigo brand color |
| `lv-icon-mono.svg` | Monochrome muted |

PNG versions available at: 16, 32, 48, 64, 128, 256, 512px

---

## Portfolio Admin

Visit `/admin/` to manage portfolio companies.

**Password**: `lyleventures2025` (change in `src/pages/admin.njk`)

Features:
- Add, edit, delete companies
- Drag to reorder
- Export JSON for deployment

**To update live site:**
1. Make changes in admin
2. Click "Export JSON"
3. Replace `src/_data/portfolio.js` with exported file
4. Commit and push to GitHub

---

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Development server with hot reload |
| `npm run build` | Full production build |
| `npm run build:css` | Build Tailwind CSS only |
| `npm run build:11ty` | Build Eleventy only |

---

## Design Tokens

### Colors

```css
/* Primary */
--lv-bg: #08080c;
--lv-bg-secondary: #111118;
--lv-accent: #6366f1;

/* Sectors */
--sector-ai: #00D4FF;
--sector-defense: #FF3366;
--sector-energy: #00FF88;
--sector-bio: #FFB800;
--sector-crypto: #AA66FF;
--sector-education: #FF6B35;
```

### Typography

- **Headlines**: System sans, weight 300, uppercase, tracking -0.02em
- **Labels**: SF Mono, uppercase, tracking 0.15em
- **Company names**: Weight 900, uppercase, tracking -0.03em

---

## SEO & Metadata

- JSON-LD structured data for organization
- Open Graph tags for social sharing
- `robots.txt` — allows all crawlers
- `llms.txt` — AI-readable site summary

---

## Contact

**Ethan Lyle**  
Founder & Managing Partner  
ethan@lyle-ventures.xyz
