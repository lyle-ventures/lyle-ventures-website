# Website Branding Sync Brief

**Date:** 2026-02-23
**From:** Brand builder system
**To:** Website project LLM
**Project:** lyle-ventures-website-main

---

## Purpose

The brand builder (`lyle-ventures-brand-builder/`) is the single source of truth for all Lyle Ventures brand assets. The website project has a `branding/` folder with copies of logos, fonts, and a brand guide. This brief tells you how to sync those copies to match the canonical versions.

## What's in the Zip

`website-sync-package.zip` contains flat files (no folder structure):

### Logos — SVG (3 files)
| File | What it is |
|------|-----------|
| `lv-icon-indigo.svg` | Square icon mark |
| `lv-linkedin-logo-indigo-outline.svg` | LinkedIn profile logo with outline |
| `lyle-ventures-standard.svg` | Full wordmark |

### Logos — PNG (6 files)
| File | What it is |
|------|-----------|
| `lv-icon-indigo-256.png` | Square icon, 256px |
| `lv-icon-indigo-512.png` | Square icon, 512px |
| `lv-linkedin-logo-indigo-outline-8x.png` | LinkedIn logo, 8x |
| `lv-linkedin-logo-indigo-outline-32x.png` | LinkedIn logo, 32x |
| `lyle-ventures-standard-8x.png` | Wordmark, 8x |
| `lyle-ventures-standard-32x.png` | Wordmark, 32x |

### Fonts (1 file)
| File | What it is |
|------|-----------|
| `Inter.zip` | Inter font family archive (primary brand font) |

### Documentation (1 file)
| File | What it is |
|------|-----------|
| `brand-guide.md` | Comprehensive brand identity reference |

---

## Instructions

### 1. Replace all logos in `branding/logos/`

Delete everything currently in `branding/logos/` and replace with the 9 logo files from the zip. The current website logos are the same files but this ensures they stay in sync going forward.

### 2. Replace font archive

Replace `branding/fonts/Inter.zip` with the copy from the zip (same file, just ensuring sync).

### 3. Replace brand guide

Replace `branding/LYLE-VENTURES-BRAND.md` with `brand-guide.md` from the zip. Rename the file to `LYLE-VENTURES-BRAND.md` to match the existing convention, or rename to `brand-guide.md` — your choice, just pick one.

The new brand guide is significantly more comprehensive than the old one. It covers:
- Full color system with hex codes and usage
- Typography scale
- All 5 investment verticals (the old guide only had 4)
- Approved copy and voice guidelines
- Logo usage rules

### 4. Add a README

Create `branding/README.md` with this content:

```markdown
# Branding Assets

These files are copies from the brand builder system (`lyle-ventures-brand-builder/`).

**Source of truth:** `lyle-ventures-brand-builder/lib/tokens.mjs`

Do not edit these files directly. If brand assets need updating, update the brand builder first, then copy the new files here.
```

### 5. Clean up `.DS_Store` files

Remove any `.DS_Store` files in `branding/` and `branding/logos/` — they're macOS metadata artifacts.

---

## What NOT to Change

This brief only covers the `branding/` folder file sync. It does NOT cover:
- Content changes to `site.js`, `thesis.njk`, or `portfolio.json` (those were handled in a separate update brief)
- Any template or layout changes
- Any deployment or build configuration

---

## Canonical Color Reference (for verification)

If you need to verify sector colors anywhere in the codebase, these are the final canonical values:

| Sector | Hex |
|--------|-----|
| AI Mechanicals | `#00D4FF` |
| Scarce Crypto | `#CC44FF` |
| Defense Tech | `#FF3366` |
| Health Tech | `#00C46A` |
| Community Experience | `#FFB800` |
| Fund of Funds | `#9CA3AF` |

Brand indigo (primary): `#6366f1`
