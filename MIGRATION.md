# Lyle Ventures Site Migration Guide

## From Squarespace to Netlify (11ty + Tailwind)

---

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account
- Netlify account (free tier works)

---

## Step 1: Set Up Local Development

### 1.1 Clone/Download the Site Files

Copy the entire `lyle-ventures` folder to your local machine.

### 1.2 Install Dependencies

```bash
cd lyle-ventures
npm install
```

### 1.3 Test Locally

```bash
# Build CSS
npm run build:css

# Start development server
npm start
```

Visit `http://localhost:8080` to preview the site.

---

## Step 2: Create GitHub Repository

### 2.1 Create New Repo

1. Go to github.com → New Repository
2. Name: `lyle-ventures` (or your preference)
3. Private or Public (your choice)
4. Don't initialize with README

### 2.2 Push Code to GitHub

```bash
cd lyle-ventures
git init
git add .
git commit -m "Initial commit - Lyle Ventures site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lyle-ventures.git
git push -u origin main
```

---

## Step 3: Deploy to Netlify

### 3.1 Connect to Netlify

1. Log in to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select your `lyle-ventures` repository

### 3.2 Configure Build Settings

Netlify should auto-detect from `netlify.toml`, but verify:

- **Build command:** `npm run build:css && npm run build`
- **Publish directory:** `public`
- **Node version:** 18 (set in Environment Variables if needed)

### 3.3 Deploy

Click "Deploy site" — Netlify will build and deploy automatically.

---

## Step 4: Configure Custom Domain

### 4.1 Add Domain in Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter: `lyle-ventures.xyz` (or your domain)

### 4.2 Update DNS at Your Registrar

**Option A: Netlify DNS (Recommended)**
- Point nameservers to Netlify's DNS servers (shown in Netlify dashboard)

**Option B: External DNS**
- Add a CNAME record: `www` → `your-site-name.netlify.app`
- Add an A record: `@` → `75.2.60.5` (Netlify's load balancer)
- Or use ALIAS/ANAME if your registrar supports it

### 4.3 Enable HTTPS

Netlify provides free SSL. Go to:
- Site settings → Domain management → HTTPS
- Click "Verify DNS configuration"
- Enable automatic HTTPS

---

## Step 5: Cancel Squarespace

Once the new site is live and DNS has propagated (usually 24-48 hours):

1. Verify new site works at your domain
2. Log in to Squarespace
3. Go to Settings → Account → Cancel Subscription
4. Download any content/data you want to keep before canceling

---

## File Structure Reference

```
lyle-ventures/
├── .eleventy.js          # Eleventy config
├── netlify.toml          # Netlify deploy config
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind config
├── scripts/
│   └── generate-pngs.js  # Logo PNG generator
├── src/
│   ├── _data/
│   │   └── portfolio.json    # Portfolio company data
│   ├── _includes/
│   │   └── base.njk          # Base layout template
│   ├── assets/
│   │   ├── css/
│   │   │   ├── input.css     # Tailwind source
│   │   │   └── style.css     # Compiled CSS
│   │   └── logos/
│   │       ├── *.svg         # SVG logos
│   │       └── *.png         # PNG logos
│   ├── pages/
│   │   ├── portfolio.njk
│   │   ├── thesis.njk
│   │   └── contact.njk
│   └── index.njk             # Homepage
└── public/                   # Built site (don't edit)
```

---

## Making Updates

### Edit Content

1. Edit `.njk` files in `src/` or `src/pages/`
2. Edit portfolio data in `src/_data/portfolio.json`
3. Commit and push to GitHub
4. Netlify auto-deploys on push

### Edit Styles

1. Edit `src/assets/css/input.css` or `tailwind.config.js`
2. Run `npm run build:css`
3. Commit and push

### Add New Pages

1. Create `src/pages/your-page.njk`
2. Add frontmatter:
   ```yaml
   ---
   layout: base.njk
   title: Your Page Title
   permalink: /your-page/
   ---
   ```
3. Add content below frontmatter
4. Update nav in `src/_includes/base.njk` if needed

---

## Logo Files Included

### Full Logo (Box + Wordmark)

| File | Use Case |
|------|----------|
| `lyle-ventures-indigo-dark.svg` | Primary - dark backgrounds |
| `lyle-ventures-indigo-dark.png` | Primary - dark backgrounds (raster) |
| `lyle-ventures-mono-dark.svg` | Monochrome - dark backgrounds |
| `lyle-ventures-mono-dark.png` | Monochrome - dark backgrounds (raster) |
| `lyle-ventures-black-light.svg` | Black - light backgrounds |
| `lyle-ventures-black-light.png` | Black - light backgrounds (raster) |

### Icon Only (Box with LV)

| File | Use Case |
|------|----------|
| `lv-icon-white.svg` | Dark backgrounds |
| `lv-icon-indigo.svg` | Dark backgrounds (branded) |
| `lv-icon-black.svg` | Light backgrounds |
| `lv-icon-*-{size}.png` | Favicons (16-512px) |

---

## Troubleshooting

### Build Fails on Netlify

- Check Node version matches (18+)
- Check build logs for specific errors
- Ensure all dependencies in package.json

### CSS Not Updating

```bash
npm run build:css
```
Then commit the updated `style.css`

### DNS Not Working

- Wait 24-48 hours for propagation
- Use [dnschecker.org](https://dnschecker.org) to verify
- Clear browser cache / try incognito

---

## Support

For issues with:
- **Netlify:** [docs.netlify.com](https://docs.netlify.com)
- **11ty:** [11ty.dev/docs](https://www.11ty.dev/docs/)
- **Tailwind:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
