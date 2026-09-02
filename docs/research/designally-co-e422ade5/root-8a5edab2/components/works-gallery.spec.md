# WorksGallery Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/WorksGallery.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-05-works.png`
- **Interaction model:** **click-driven** — category filter buttons + a "View More" load-more button.
- Source element: `.elementor-element-36d3a17` (Premium Addons `premium-img-gallery`, isotope `fitRows`, hover effect `zoomin`)

## DOM Structure
```
<section>                      height 1544.28px
  └ inner                      padding 160px 0, flex column, align-items center, gap 120px
      ├ heading row            "Explore" "our" "works" + decorative SVG to the right
      ├ filter bar             width 1097.25px, centred row of category buttons
      ├ grid                   width 1097.25px, 4 columns of 274.312px tiles
      └ "View More" button
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Section root
- width: 1425px (100%); height: 1544.28px
- display: flex; flex-direction: column; position: relative

### Inner
- padding: **160px 0**
- display: flex; flex-direction: column; justify-content: space-between; align-items: center
- **gap: 120px**
- width: 1425px

### Heading
Three separate `<h1>` elements on one line, plus a decorative illustration to their right.
- font-family: **EB Garamond**; font-size: **72px**; font-weight: 500; line-height: 72px
- `Explore` — color rgb(33, 33, 33), width 219.242px
- `our` — color rgb(33, 33, 33), width 100.445px
- `works` — color **rgb(245, 99, 65)**, width 166.406px
- The three sit on one row with roughly 16px between them (x = 259 / 494 / 610 at 1440).
- Decorative SVG to the right at x=817: `works-illustration.svg`, 349 × 239, viewBox `0 0 349 239`,
  colour rgb(105, 114, 125). Asset:
  `/sites/designally-co-e422ade5/shared/svg/works-illustration.svg`
  It overlaps the heading row vertically (heading y=5959, svg y=5909).

### Filter bar
- width: 1097.25px; height: 64.5px
- display: flex; flex-direction: row; justify-content: center; align-items: center
- Inner list: width 847.586px; text-align center

### Filter button `<a>`
- display: block
- padding: **0 12px**
- margin-bottom: **40px**
- height: 24px
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- text-align: center
- transition: **0.3s ease-in-out**
- **Inactive:** color rgb(33, 33, 33)
- **Active:** color **rgb(245, 99, 65)** (class `active`)
- `All projects` is active on load.

Filters, in rendered order, with the `/` separators interleaved:
| Label | filter value | matching items |
|---|---|---|
| All projects | `null` (all) | 58 |
| `/` | separator, not a button | — |
| Logo Design | `logo-design` | 16 |
| `/` | separator | — |
| Packaging | `packaging` | 8 |
| `/` | separator | — |
| Brand CI | `brand-ci` | 16 |
| `/` | separator | — |
| Website | `website` | 8 |
| `/` | separator | — |
| Social Media | `social-media` | 22 |

The `/` separators are decorative text (Poppins 16px, color rgb(33, 33, 33), width 31.617px with the
same `padding: 0 12px`). Render them as plain non-interactive spans — on the live site they are
inert `.category` nodes with a junk filter value.

### Grid
- Outer wrapper: width 1097.25px; **overflow: hidden**
- Container: width 1097.25px; position: relative
- **4 columns × 274.312px = 1097.25px.** The live site absolutely-positions tiles via isotope;
  reproduce with **CSS Grid: `grid-template-columns: repeat(4, 1fr)`** — same visual result, no
  layout library. Do not absolutely position tiles.

### Tile
- width: 274.312px; height: 274.312px (square)
- **padding: 8px**
- Inner image container: 258.312 × 258.312, **border-radius: 16px**, **overflow: hidden**
- `<img>`: 258.312 × 258.312, **object-fit: cover** (source images are square, 1:1)
- transition on the image: **0.3s ease-in-out**

### "View More" button
- display: inline-flex; align-items: center
- width: 172.898px; height: 53.203px
- **padding: 16px 40px 16px 48px** (asymmetric — more padding on the left)
- border: **1px solid rgb(245, 99, 65)**
- border-radius: **200px**
- color: rgb(245, 99, 65); background: transparent
- font-family: Poppins; font-size: 16px; font-weight: 500; line-height: 19.2px
- text-align: center
- transition: **0.3s ease-in-out**

## States & Behaviors

### Category filtering (click-driven)
- **Trigger:** click a category button.
- Clicking sets it `active` (orange) and clears the previous one.
- The grid shows only tiles whose `categories` include the selected value; `All projects` shows all.
- **8 of the 58 items belong to two categories** — they must appear under both.
- **Transition:** the live site animates tile positions via isotope. A simple opacity/layout change is
  acceptable; keep the `0.3s ease-in-out` feel on the buttons themselves.

### Load more (click-driven)
- **12 tiles are visible on initial load** (3 rows × 4). The other 46 are hidden.
- **Trigger:** click "View More" → reveal the next batch.
- Batch size on the live site is not exposed; use **12** (one more set of 3 rows) per click.
- Hide the button once every tile in the current filter is visible.
- Changing the filter resets the visible count back to 12.

### Hover — gallery tile
Measured site rule: `.premium-img-gallery.zoomin .pa-gallery-img:hover img { transform: scale(1.1) }`
- **State A:** `transform: scale(1)`
- **State B (hover):** `transform: scale(1.1)`
- **Transition:** 0.3s ease-in-out
- The 16px-radius container has `overflow: hidden`, so the image zooms inside the rounded frame.

### Hover — filter buttons
- **State A:** color rgb(33, 33, 33) (inactive)
- **State B:** color rgb(245, 99, 65)
- **Transition:** 0.3s ease-in-out

### Hover — "View More"
Measured site rule:
`.premium-gallery-load-more-btn:hover { color: var(--e-global-color-secondary); background-color: var(--e-global-color-primary); }`
- **State A:** transparent background, color rgb(245, 99, 65), 1px orange border
- **State B (hover):** background **rgb(245, 99, 65)**, color **rgb(255, 255, 255)**
- **Transition:** 0.3s ease-in-out

## Per-State Content — the 58 gallery items

The full item list (image filename + categories, in source order) is in
`docs/research/designally-co-e422ade5/root-8a5edab2/works-items.json` under `items[]`.
Each entry has `img` (path relative to the WordPress uploads dir) and `cats`.

All images are already downloaded to
`public/sites/designally-co-e422ade5/root-8a5edab2/images/` under their **basename**
(e.g. `2023/10/Designally-Logo-design-foodie.jpg` → `Designally-Logo-design-foodie.jpg`).
Two of the 58 items carry no image — **skip those two**, giving 56 renderable tiles.

Category totals to verify against: logo-design 16, packaging 8, brand-ci 16, website 8,
social-media 22 (70 assignments across 58 items).

The first twelve items, which are the ones visible on load, are:
1. `Charmy_IG_Designally-Post_2-2-scaled.jpg` — logo-design
2. `Designally-Logo-design-foodie.jpg` — logo-design
3. `Designally-Logo-design-tattva.jpg` — logo-design
4. `Designally-Logo-design-sofresh.jpg` — logo-design
5. `Designally-Logo-design-sook-sabai-spa.jpg` — logo-design
6. `Designally-Logo-design-De-Vineri.jpg` — logo-design
7. `Designally-Logo-design-Utopia-group.jpg` — logo-design
8. `Designally-Logo-design-Success-group.jpg` — logo-design
9. `Pet-Party-1080x1920px-1.jpg` — brand-ci
10. `Nanobag-1080x1920px-1.jpg` — brand-ci
11. `Rak-Mao-1080x1920px-1.jpg` — brand-ci
12. `PEA-1080x1920px-1.jpg` — brand-ci

## Assets
- 56 gallery images in `public/sites/designally-co-e422ade5/root-8a5edab2/images/`
- `works-illustration.svg` in `public/sites/designally-co-e422ade5/shared/svg/`

## Text Content (verbatim)
Heading: `Explore` `our` `works`
Filters: `All projects` `/` `Logo Design` `/` `Packaging` `/` `Brand CI` `/` `Website` `/` `Social Media`
Button: `View More`

## Responsive Behavior
- **Desktop (≥1025px):** 4 columns, 274.312px tiles, heading at 72px.
- **Tablet (768–1024px):** 3 columns, tiles fill the container; heading ~56px; the decorative SVG
  shrinks or drops below the heading.
- **Mobile (≤767px):** 2 columns; heading ~40px and wraps; filter bar wraps to multiple lines and
  stays centred; the decorative SVG is hidden.
- Tiles stay square (`aspect-ratio: 1`) at every width.

## Build notes
- `"use client"` IS required (filter + load-more state).
- Use CSS Grid, not isotope/absolute positioning.
- Read the item list from `works-items.json` at build time by transcribing it into a typed
  `DsgWorkItem[]` constant in the component file — do NOT fetch the JSON at runtime, and do NOT
  import it from `docs/`.
- Type items with `DsgWorkItem` and filters with `DsgWorkFilter` from `@/types/designally`.
- Verify `npx tsc --noEmit` passes before finishing.
