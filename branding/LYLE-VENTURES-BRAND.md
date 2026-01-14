# Lyle Ventures Brand Guidelines

## Brand Overview

Lyle Ventures is a venture capital firm focused on "creators and builders at the technology frontier." The visual identity balances technical precision with approachable elegance—a periodic table element meets modern fintech.

---

## Colors

### Primary Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Indigo** | `#6366f1` | 99, 102, 241 | Primary accent, logo, interactive elements |
| **Near Black** | `#111827` | 17, 24, 39 | Primary text (light backgrounds) |
| **White** | `#ffffff` | 255, 255, 255 | Primary text (dark backgrounds), backgrounds |
| **Pure Dark** | `#08080c` | 8, 8, 12 | Dark mode background |

### Sector Colors (Portfolio Categorization)

| Sector | Hex | RGB |
|--------|-----|-----|
| AI | `#00D4FF` | 0, 212, 255 |
| Defense | `#FF3366` | 255, 51, 102 |
| Energy | `#00FF88` | 0, 255, 136 |
| Biomedical | `#FFB800` | 255, 184, 0 |
| Crypto | `#AA66FF` | 170, 102, 255 |
| Education | `#FF6B35` | 255, 107, 53 |

---

## Typography

### Font Family

**Inter** — Primary typeface for all applications

```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Inter is a free, open-source typeface designed for screen readability. It closely matches system UI fonts (San Francisco, Segoe UI) while providing cross-platform consistency.

**Source:** https://fonts.google.com/specimen/Inter

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text |
| 500 | Medium | Wordmark text, emphasized body |
| 600 | SemiBold | LV mark, headings, buttons |
| 700 | Bold | Strong emphasis |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tighter` | -0.025em | Wordmark ("Lyle.Ventures") |
| `tight` | -0.01em | Headings |
| `normal` | 0 | Body text |
| `wide` | 0.02em–0.03em | LV mark |

---

## Logo System

### Structure

The logo follows a **Box + Dot** hybrid format:

```
[LV] Lyle.Ventures
 ↑       ↑  ↑
 │       │  └── Indigo dot (accent)
 │       └───── Near-black wordmark
 └──────────── Indigo box with LV mark
```

### Logo Mark (Box)

The LV box is designed to evoke a periodic table element—solid, elemental, foundational.

| Property | LinkedIn Icon (300px) | Favicon (32px) | Wordmark Box |
|----------|----------------------|----------------|--------------|
| **Box size** | 292×292 (with 4px inset) | 30.5×30.5 | 30.5×30.5 |
| **Border** | 8px solid `#6366f1` | 1.5px solid `#6366f1` | 1.5px solid `#6366f1` |
| **Background** | White | White | Transparent |
| **LV font size** | 130px | 15px | 15px |
| **LV font weight** | 600 (SemiBold) | 600 (SemiBold) | 600 (SemiBold) |
| **LV letter spacing** | 0.03em | 0.02em | 0.02em |
| **LV color** | `#6366f1` | `#6366f1` | `#6366f1` |

### Wordmark

| Property | Value |
|----------|-------|
| **Font** | Inter |
| **Weight** | 500 (Medium) |
| **Size** | 18px (at 1x scale) |
| **Letter spacing** | -0.025em |
| **"Lyle" color** | `#111827` (light bg) or `#ffffff` (dark bg) |
| **Dot color** | `#6366f1` |
| **Dot size** | 125% of base font |
| **"Ventures" color** | `#111827` (light bg) or `#ffffff` (dark bg) |

### The Dot

The indigo dot is a key brand element. It sits tightly between "Lyle" and "Ventures" with minimal spacing.

```css
/* Dot positioning */
margin-left: 0.02em;
margin-right: -0.1em;  /* Tucks close to "V" */
font-size: 125%;
color: #6366f1;
```

---

## Logo Files

### Primary Assets

| Filename | Format | Dimensions | Use Case |
|----------|--------|------------|----------|
| `lyle-ventures-standard.svg` | SVG | 200×40 | Vector master, web |
| `lyle-ventures-standard-8x.png` | PNG | 1600×320 | High-res digital |
| `lyle-ventures-standard-32x.png` | PNG | 6400×1280 | Print, archival |

### LinkedIn / Social Icon

| Filename | Format | Dimensions | Use Case |
|----------|--------|------------|----------|
| `lv-linkedin-logo-indigo-outline.svg` | SVG | 300×300 | Vector master |
| `lv-linkedin-logo-indigo-outline-8x.png` | PNG | 2400×2400 | LinkedIn upload |
| `lv-linkedin-logo-indigo-outline-32x.png` | PNG | 9600×9600 | Archival |

### Favicon / App Icon

| Filename | Format | Dimensions | Use Case |
|----------|--------|------------|----------|
| `lv-icon-indigo.svg` | SVG | 32×32 | Vector master |
| `lv-icon-indigo-256.png` | PNG | 256×256 | Apple touch icon |
| `lv-icon-indigo-512.png` | PNG | 512×512 | PWA icon |

---

## Usage Guidelines

### Clear Space

Maintain minimum clear space around the logo equal to the height of the "L" in the wordmark.

### Minimum Size

- **Full wordmark:** 120px wide minimum
- **Icon only:** 24px minimum

### Do's

- ✓ Use on white or light neutral backgrounds
- ✓ Use white version on dark backgrounds (`#08080c` or darker)
- ✓ Maintain aspect ratio when scaling
- ✓ Use SVG for web whenever possible

### Don'ts

- ✗ Don't stretch or distort
- ✗ Don't change the indigo color
- ✗ Don't add effects (shadows, gradients, outlines)
- ✗ Don't separate the box from the wordmark
- ✗ Don't change the dot to a different shape

---

## Implementation

### HTML Example (Wordmark)

```html
<a href="/" class="logo">
  <div class="lv-box">
    <span class="lv-mark">LV</span>
  </div>
  <span class="lv-wordmark">
    Lyle<span class="lv-dot">.</span>Ventures
  </span>
</a>
```

### CSS Example

```css
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.lv-box {
  width: 32px;
  height: 32px;
  border: 1.5px solid #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lv-mark {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 0.02em;
}

.lv-wordmark {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  letter-spacing: -0.025em;
}

.lv-dot {
  color: #6366f1;
  font-size: 125%;
  margin-left: 0.02em;
  margin-right: -0.1em;
}
```

### Loading Inter Font

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## File Locations

### Source (Repository)

```
/branding/
├── LYLE-VENTURES-BRAND.md    # This file
├── fonts/
│   └── Inter.zip             # Inter font (for offline/design use)
└── logos/
    ├── lyle-ventures-standard.svg
    ├── lyle-ventures-standard-8x.png
    ├── lyle-ventures-standard-32x.png
    ├── lv-linkedin-logo-indigo-outline.svg
    ├── lv-linkedin-logo-indigo-outline-8x.png
    ├── lv-linkedin-logo-indigo-outline-32x.png
    ├── lv-icon-indigo.svg
    ├── lv-icon-indigo-256.png
    └── lv-icon-indigo-512.png
```

### Website (Served URLs)

Logos are served at `/logos/` on the website (e.g., `https://lyle-ventures.xyz/logos/lv-icon-indigo.svg`).

---

## Version History

| Date | Change |
|------|--------|
| 2026-01-13 | Reorganized assets into `/branding/` folder |
| 2026-01-13 | Added Inter font to website via Google Fonts |
| 2026-01-13 | Standardized on Inter font for cross-platform consistency |
| 2026-01-13 | Increased LV mark size (130px) for "periodic table" density |
| 2026-01-13 | Tightened dot spacing in wordmark |

---

*Last updated: January 13, 2026*
