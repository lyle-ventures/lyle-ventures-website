# Lyle Ventures Brand Guide

*Last updated: February 2026*

---

## Brand Story

Lyle Ventures is a family office backing founders at the earliest stages. We invest at the intersection of physical bottlenecks, scarce digital assets, and technology that is truly life-changing or timeless.

The current AI transition is the most significant in human history and requires the largest economic system upgrade ever attempted. We believe this creates generational opportunity in five categories.

---

## Positioning

**Tagline:** Venture capital for founders reshaping how we produce intelligence, move value, provide security, give life, and bring joy.

**Short form:** We back early-stage companies building critical systems for the AI economy.

**Boilerplate:** Lyle Ventures backs early-stage companies building critical systems for the AI economy. We are a family office for founders reshaping how we produce intelligence, move value, provide security, give life, and bring joy. Our core portfolio categories are: AI Mechanicals, Scarce Crypto, Defense Tech, Health Tech, and Community Experience. Above all, we love learning from the founders and companies we support.

---

## Investment Verticals

### AI Mechanicals
**Function:** Produces intelligence | **Why:** Physical bottlenecks

Physical machinery forming the mechanical layer for producing abundant intelligence. Chips, fabs, reactors, turbines, cooling systems, transformers. Constrained by principles of physics.

### Scarce Crypto
**Function:** Moves value | **Why:** Scarce digital assets

Assets that resiliently store value and move at high velocity with minimal friction. Fewer middlemen, more ownership. Scarce crypto assets only.

### Defense Tech
**Function:** Provides security | **Why:** Timeless

Security is a timeless imperative. AI and robotics create new conflict vectors that require innovation and investment. Autonomous hardware and systems, cyber defense, space.

### Health Tech
**Function:** Gives life | **Why:** Life changing

AI unlocks what was previously thought impossible in human biology. Human upgrades for an age of exponential change. The gift of life.

### Community Experience
**Function:** Brings joy | **Why:** Human interaction

Real-world human experiences that are already scarce and will only become more so in the world of AI. The things that make us human — connection, play, presence, shared moments.

---

## Visual Identity

### Color Palette

#### Primary

| Color | Hex | Swatch | Role |
|-------|-----|--------|------|
| Indigo | `#6366f1` | | Primary accent — logo, links, interactive elements |
| Near Black | `#111827` | | Text on light backgrounds |
| White | `#ffffff` | | Light backgrounds, text on dark backgrounds |
| Pure Dark | `#08080c` | | Internal/Universe dashboard background only |

#### Sector

| Sector | Hex | Role |
|--------|-----|------|
| AI Mechanicals | `#00D4FF` | Categorization and data visualization |
| Scarce Crypto | `#CC44FF` | Categorization and data visualization |
| Defense Tech | `#FF3366` | Categorization and data visualization |
| Health Tech | `#00C46A` | Categorization and data visualization |
| Community Experience | `#FFB800` | Categorization and data visualization |

#### Usage Rules

- Indigo is the only brand color used for UI elements, links, and accent treatments
- Sector colors appear only in portfolio categorization, charts, and data contexts
- **Light mode is the primary presentation:** white background, near-black text, indigo accents — this matches the public lyle.vc website (`base.njk: bg-white text-gray-900`)
- Dark mode exists only for the internal Universe dashboard (`universe.njk`). It is NOT the public brand.
- pureDark (#08080c) and darkCard (#111118) are NOT used on the public website body — they are internal-only tokens
- All public-facing assets (LinkedIn, email, social, decks) use the light theme
- Never mix sector colors with UI indigo in the same visual element

---

### Typography

**Primary typeface:** Inter

Inter is a free, open-source typeface designed for screen readability. It closely matches system UI fonts while providing cross-platform consistency.

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Hero headlines only (uppercase, tight tracking) |
| 400 | Regular | Body text |
| 500 | Medium | Wordmark, emphasized body, subtitles |
| 600 | SemiBold | Headings, LV mark, buttons, card titles |
| 700 | Bold | Strong emphasis, navigation |
| 900 | Black | Company name display (rare, website only) |

**Secondary typeface:** SF Mono (fallback: Fira Code, Consolas)

Used only for code, data labels, and ticker-style metadata contexts.

**Rules:**
- Maximum 2 typefaces in any single deliverable (Inter + mono)
- Maximum 3 weights in any single slide or page
- Body text is always Inter 400
- When in doubt, use Inter 400 at the default body size

---

### Logo System

The Lyle Ventures logo is a **Box + Dot** hybrid:

```
[LV] Lyle.Ventures
```

The [LV] box evokes a periodic table element — solid, elemental, foundational. The indigo dot between "Lyle" and "Ventures" is a distinctive brand element.

#### Logo Variants

| Variant | Use Case | Files |
|---------|----------|-------|
| Full wordmark | Primary use everywhere | `lyle-ventures-standard.*` |
| Square mark | Social profile pics, favicons | `lv-linkedin-logo-indigo-outline.*` |
| Small icon | Favicon, app icon | `lv-icon-indigo.*` |

#### Clear Space

Maintain minimum clear space around the logo equal to the height of the "L" in the wordmark.

#### Minimum Sizes

- Full wordmark: 120px wide minimum
- Icon only: 24px minimum

#### Do

- Use on white or light neutral backgrounds
- Use white wordmark variant on dark backgrounds
- Maintain aspect ratio when scaling
- Use SVG for web whenever possible

#### Don't

- Stretch or distort
- Change the indigo color
- Add effects (shadows, gradients, outlines)
- Separate the box from the wordmark
- Change the dot to a different shape

---

### LinkedIn Assets

| Asset | Dimensions | File |
|-------|-----------|------|
| Company banner | 1128 x 191 | `lv-linkedin-company-banner.png` |
| Employee background | 1584 x 396 | `lv-linkedin-employee-bg.png` |
| Company logo | 300 x 300 | `lv-linkedin-logo-indigo-outline-8x.png` |

#### Safe Zones & Overlaps

**Company banner (1128 x 191):**
The company logo (~300px square) overlaps the bottom-left corner of the banner. Do not place important content in the bottom-left ~320px × 120px zone. Content should be positioned center or right.

**Employee background (1584 x 396):**
The profile photo (circular, ~300-400px) overlaps the bottom-left area. The name/title text block sits below center-left. Avoid important content in the left ~400px and bottom ~150px. Safe zone is upper-right and center-right.

#### Banner Design

**Company banner:** White (#ffffff) background — matches lyle.vc public website body (`bg-white`). Subtle nearBlack dot texture for surface depth (standard pattern-fill treatment, ~2000 dots at 3-6% opacity). LV box mark + "Lyle.Ventures" wordmark at 26px in nearBlack text with indigo dot and box, right-aligned with 60px margin from edge. No gradients, no accent lines, no layered elements.

**Employee background:** Same white (#ffffff) background with nearBlack dot texture (~3500 dots). LV box mark in upper-right at 50% opacity with subdued "LYLE VENTURES" letterspaced label beneath at 20% opacity. Generic — no employee name, suitable for any team member. Content avoids the profile photo overlap zone (bottom-left).

---

### Email Signature

| Element | Value |
|---------|-------|
| File | `assets/platforms/email/lv-email-signature.html` |
| Guide | `assets/platforms/email/email-signature-guide.md` |
| Theme | Light (white background — consistent with public brand) |

**Design:** Clean text-only signature using system fonts. No images, logos, or social icons. The indigo accent (`#6366f1`) is the only brand color; all other values are email-standard system grays.

**Color palette (light theme):**

| Role | Hex | Token |
|------|-----|-------|
| Body text | `#1a1a1a` | `EMAIL.textPrimary` |
| Title / secondary | `#555555` | `EMAIL.textSecondary` |
| Labels | `#888888` | `EMAIL.textLabel` |
| Indigo accent | `#6366f1` | `EMAIL.accent` |
| Background | `#ffffff` | `EMAIL.bg` |

These light-theme grays are defined in `lib/tokens.mjs` under the `EMAIL` export. They use email-standard system grays rather than the brand's nearBlack — this is standard practice for email client compatibility.

---

## Voice & Tone

### Character

We sound like a knowledgeable peer sharing a perspective, not a marketer making a pitch. Confident without arrogance. Specific without jargon. Brief without being cold.

### Principles

1. **Lead with the idea, not the fund.** Center the thesis, not ourselves.
2. **Be specific.** "Physical bottlenecks constrained by physics" beats "exciting opportunities."
3. **Respect the reader's time.** If it can be said in fewer words, say it in fewer words.
4. **Show, don't tell.** Name the companies, describe the technology, cite the data.
5. **Stay grounded.** We're a family office, not a megafund. Own that scale with confidence.

### Proprietary Terms

| Term | Usage |
|------|-------|
| AI Mechanicals | Investment vertical — never "AI infrastructure" |
| Scarce Crypto | Investment vertical — never "blockchain" or "web3" |
| Community Experience | Investment vertical — never "entertainment" |
| Perpetual motion | Founder evaluation framework (action + learning velocity) |
| Learning rate | The critical early-stage founder signal |
| Enterprise Build Test | "Can a sophisticated enterprise build this with AI in 6-12 months?" |
| Bottleneck Test | "Are they in the constraint or commodity layer?" |

### Banned Language

- "Disrupt" / "disruption"
- "Synergy" / "synergistic"
- "Cutting-edge" / "state-of-the-art"
- "Leverage" (as a verb in marketing copy)
- "Web3" (use "Scarce Crypto")
- "Portfolio company" in external copy (say the company name, or "company we back")

---

## File Locations

All brand assets live in the `lyle-ventures-brand-builder/` folder. This is the single source of truth. The website repository, Canva, and all other platforms pull from here.

See CLAUDE.md for the full file tree.
