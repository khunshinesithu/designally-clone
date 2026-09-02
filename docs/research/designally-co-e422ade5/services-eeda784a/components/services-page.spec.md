# /services/ Page Specification

- **Route:** `src/app/services/page.tsx`
- **Page key:** `services-eeda784a` · **Site key:** `designally-co-e422ade5`
- **Document height at 1440:** 7477px
- **Raw extraction:** `extract-services-page.json` in this page's research dir (double-JSON-encoded)

## Page structure

| # | Section | Live id | Height | Component |
|---|---|---|---|---|
| — | Floating header | `243d1dc` | overlay | `shared/FloatingHeader` (`activeNav="/services/"`) |
| — | Site header | `56fa1bc` | 131 | `shared/SiteHeader` (`activeNav="/services/"`) |
| 1 | Hero video band | `2508f80` | 450 | `ServicesHero` |
| 2 | Our Services (sticky panel) | `8f29021` | 4789 | `ServicesOverview` |
| 3 | DIVE process | `9f58303` | 1514 | `ServicesProcess` |
| — | Orange CTA | `1caafeb` | 669 | `shared/CtaSection` |
| — | Footer | `ae4d07f` | 57 | `shared/SiteFooter` |

## 1. Hero video band `2508f80`

A short full-bleed band showing a cropped background video.

- Section: 1425 × **450**, flex column, `overflow: visible` on the live site
- Inner: `max-width: 1200px`, gap 20px
- `<video>`: **`position: absolute`**, 1425 × **802**, `object-fit: cover`, `autoplay loop muted`
  — i.e. an 802px-tall video showing through a 450px-tall band, so it is cropped.
- Source: `/sites/designally-co-e422ade5/services-eeda784a/videos/G-22.mp4` (already downloaded, 45MB)
- Add `playsInline` and `preload="metadata"`; mark it `aria-hidden` (decorative).
- Give the section `overflow: hidden` in the clone so the oversized video is clipped to the 450px
  band rather than bleeding over neighbouring sections.

## 2. Our Services `8f29021` — sticky panel, mirrored from the homepage

Two columns, each **713px** (50%), total height 4789.

### Left panel `939fb68` — sticky, orange
- `background: rgb(245, 99, 65)`
- **`border-radius: 0 0 80px 0`** ← bottom-right only. (The homepage's panel is `0 80px 80px 0`.
  Do not copy the homepage value.)
- `padding: 160px 0 0`, width 713, x=0
- Elementor sticky: `{"sticky":"top","sticky_parent":"yes","sticky_on":["desktop"]}` →
  `position: sticky; top: 0`, **desktop only** (≥1025px), scoped to the section.
- Content column: `max-width: 540px`, x=86, gap 40px:
  - `Our Services` — EB Garamond **76px / 500 / lh 76px**, `rgb(255, 255, 255)`
  - Paragraph — Poppins **16px / 400 / lh 24px**, `rgb(255, 255, 255)`, width 540:
    > We specialize in shaping impactful brand identities, building captivating websites through design and development, and providing reliable design support to meet all your requirements.
  - Button `Get a Quote` → **`/contact-us/`** (relative — that page is in this clone) —
    Poppins **16px / 500 / lh 19.2px**, `rgb(255, 255, 255)`, `border-radius: 200px`, 210 × 53

### Right column `0a79e62` — five cards
- Transparent, `padding: 160px 0`, width 713, x=713
- Card content is **540px** wide at x=799
- Each card, in order:
  - Eyebrow `<h3>`: Poppins **20px / 500 / lh 26px**, `rgb(33, 33, 33)`, x=826
  - Title `<h1>`: **EB Garamond 76px / 500 / lh 76px**, `rgb(33, 33, 33)`, x=799
    (note: serif and much larger than the homepage's Poppins 43.2px card titles)
  - Description: Poppins **16px / 400 / lh 24px**, `rgb(33, 33, 33)`, width 540
  - Image: **540 × 339**, **`border-radius: 8px`** (the homepage's are square)
  - **No pill tags on this page** — that is a homepage-only treatment.

| # | Eyebrow | Title | Image (reuse the homepage's copies) |
|---|---|---|---|
| 1 | BRANDING | Brand Core | `/sites/designally-co-e422ade5/root-8a5edab2/images/brandcore.jpg` |
| 2 | BRANDING | Brand Visuals | `…/root-8a5edab2/images/brandvisual.jpg` |
| 3 | BRANDING | Brand Execution | `…/root-8a5edab2/images/brandexc.jpg` |
| 4 | WEBSITE | Website + Dev | `…/root-8a5edab2/images/website.jpg` |
| 5 | DESIGN SUPPORT | **Design Ally** | `…/root-8a5edab2/images/designsupport.jpg` |

Note card 5: the eyebrow is `DESIGN SUPPORT` but the title is `Design Ally` — different from the
homepage's `Design Support`. Reproduce as measured.

Descriptions (verbatim — these differ from the homepage's copy for the same services):

1. **Brand Core** — Delving deep into your brand strategy, we establish a strong foundation that defines your unique identity, setting the stage for a powerful and purposeful brand presence.
2. **Brand Visuals** — Empower your brand with a design system and curated brand assets, ensuring consistency and flexibility.
3. **Brand Execution** — Bring your brand identity to life by translating it into tangible assets that communicate effectively with your audience.
4. **Website + Dev** — Our Website Design and Development service ensure your website represents your brand authentically and effectively. Our expert development team brings your vision to life, crafting a dynamic online platform that drives user engagement and achieves your business objectives.
5. **Design Ally** — Our Design Support service is your trusted design ally, offering monthly support for all your creative needs. Say goodbye to complexities and hello to hassle-free design solutions, allowing you to focus on what you do best while we take care of the rest.

Card vertical positions (y of the eyebrow): 637, 1632, 2482, 3357, 4344.

## 3. DIVE process `9f58303`

- Section 1425 × 1514; inner `max-width: 1200px`, `padding: 160px 0 154px`, **gap 80px**
- Four steps on a **320px vertical pitch** (icon centres at y ≈ 5397, 5717, 6037, 6357),
  **alternating sides**:

| # | Step | Icon side | Icon file (240 × 240 rendered, 512 × 512 source) |
|---|---|---|---|
| 1 | DIVE | **left** (x=324), text right (x=869) | `Designally_Our-service_icon-Dive.png` |
| 2 | DEFINE | text left (x=241), **icon right** (x=846) | `Designally_Our-service_icon-Define.png` |
| 3 | DESIGN | **left** (x=340), text right (x=869) | `Designally_Our-service_icon-Design.png` |
| 4 | DELIVER | text left (x=229), **icon right** (x=848) | `Designally_Our-service_icon-Deliver.png` |

Icons are at `/sites/designally-co-e422ade5/services-eeda784a/images/<file>` (downloaded).

- Step heading `<h1>`: Poppins **76px / 600 / lh 76px**, **`rgb(245, 99, 65)`**
- Step body: Poppins **16px / 400 / lh 24px**, `rgb(33, 33, 33)`, width ~281–312px

Body copy (verbatim, truncated in the extraction — the full strings are in the JSON):
1. **DIVE** — We delve into learning about your brand and business, ensuring a comprehensive understanding of who you are and what you need.
2. **DEFINE** — Our team carefully analyze and digest the information gathered, crafting a detailed plan that aligns with your goals.
3. **DESIGN** — Work our magic to explore the best creative design solutions for your brand, don't stop until we find the perfect fit.
4. **DELIVER** — Deliver the project with the highest possible quality. Our team will always be happy to support and assist every step of the way.

Check each against `extract-services-page.json` before shipping — the tails above were reconstructed
from a 110-character preview and must be confirmed against the raw values.

## Metadata

- `<title>`: `Services | DESIGNALLY`

## Responsive

Only 1440 was measured. Scale sensibly and flag your choices:
- Panel/cards stack below 1025px, where the sticky turns off (`sticky_on: ["desktop"]`).
- `Our Services` and card titles 76px → ~40px at ≤767px; DIVE headings 76px → ~44px.
- The DIVE steps' alternating sides collapse to a single column (icon above text) below 768px.

## Build notes
- No `"use client"` needed — sticky and the video are declarative.
- Panel and card column must be **siblings inside one positioned parent** or the sticky breaks
  (same constraint as the homepage's `ServicesSection`).
- Import the four shared chrome components and pass `activeNav="/services/"`.
- Mirror `src/app/page.tsx` for route structure and the `dsg-site` wrapper.
- Verify `npx tsc --noEmit` and `npm run build` before finishing.
