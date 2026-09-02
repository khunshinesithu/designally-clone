# ServicesSection Specification (sticky panel + layout shell)

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/ServicesSection.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/state-header-scrolled-1500.png`
  (the orange panel mid-scroll). Note: `section-04-services.png` shows the panel repeated — that is a
  Playwright stitching artifact of a sticky element, **not** the design. Ignore it.
- **Interaction model:** **scroll-driven — a sticky left panel while the right column scrolls past.**
  It is NOT a tabbed interface and the numbered rows do NOT auto-highlight on scroll.
- Source element: `.elementor-element-bd5220f`

This component owns the layout shell and the sticky panel. The five cards in the right column are
built separately as `ServiceCard` — import and render them here.

## DOM Structure
```
<section>                                  height 4121px, position relative
  ├ <aside> sticky panel   (712.5px wide, orange, sticks to top)
  │   └ inner              740px tall content block
  │       ├ <h1>           OUR SERV<i>I</i>CES
  │       ├ <p>            intro paragraph
  │       ├ nav list       4 rows, each a link with number + label + ↗ icon
  │       └ <a>            "Start Your Project with Designally" outline button
  └ <div> card column      356.25px wide, holds 5 × <ServiceCard>
```
The panel and the card column must be **siblings inside one positioned parent** — splitting them
across components breaks `position: sticky`.

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Section root
- position: relative
- width: 1425px (100%); height: 4121px
- display: flex (row) — panel left, cards right

### Sticky panel `<aside>`
- **position: sticky; top: 0** — scoped to the section (Elementor `sticky: top`, `sticky_parent: yes`)
- **Desktop only.** Below 1025px the panel is a normal block (`sticky_on: ["desktop"]`).
- width: **712.5px** (50% of the 1425px section)
- background-color: **rgb(245, 99, 65)**
- **border-radius: 0 80px 80px 0**
- padding: **114px 0 0**
- The panel bleeds to the left viewport edge (x = 0), not to the container edge.

### Panel inner content block
- width: 712.5px; height: 740px; display: flex
- Its text column is **356.25px wide, starting at x = 178** (aligned to the page container's left edge).

### Heading `<h1>`
- text: `OUR SERVICES` — but the letter **I** in "SERVICES" is wrapped in `<i>`:
  `OUR SERV<i>I</i>CES`
- font-family: **EB Garamond**
- font-size: **50.4px**
- font-weight: 500
- line-height: 50.4px
- color: rgb(255, 255, 255)
- width: 356.25px; height: 50.398px

### Paragraph `<p>`
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- color: rgb(255, 255, 255)
- width: 356.25px; height: 120px
- margin-bottom: 14.4px
- Sits 40px below the heading (heading y=1793 h=50.4 → paragraph y=1883).

### Nav list wrapper
- width: 356.25px; height: 356px
- display: flex (column)
- Starts at y = 2058; rows are on a **95px pitch** (2058 / 2153 / 2248 / 2343).

### Nav row `<a>` (× 4)
- display: flex
- width: 356.25px; height: **71px**
- **border-bottom: 1px solid rgb(255, 255, 255)**
- transition: background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.4s
- Inner wrapper: display flex; justify-content: flex-start; **padding: 0 0 24px**; height 70px
- Layout inside the row: number at x=178, label at x≈214–220, ↗ icon right-aligned at x=498

#### Row number `<h3>`
- font-family: Poppins; font-size: **20px**; font-weight: 500; line-height: 26px
- color: **rgba(255, 255, 255, 0.48)**

#### Row label `<h1>`
- font-family: Poppins; font-size: **23.04px**; font-weight: 500; line-height: 29.952px
- color: rgb(255, 255, 255)

#### Row icon
- `ArrowUpRightIcon` from `../shared/icons`, viewBox `0 0 24 24`
- rendered **40 × 40**, `fill`/`color`: rgb(255, 255, 255), stroke-width 1.5
- wrapper 35.96 × 46, text-align center

Rows, in order:
| # | Label | href | label width |
|---|---|---|---|
| 01 | Branding | `#Branding` | 106.219px |
| 02 | Website Development | `#Website` | 256.141px |
| 03 | Design Support | `#DesignAlly` | 177.734px |
| 04 | Online Brand Guide | `https://designally.co/online-brand-guide/designally/` | 224.578px |

Rows 01–03 are in-page anchors — they rely on `html { scroll-behavior: smooth }` (already in
globals.css) and on `ServiceCard` rendering matching `id` attributes. Row 04 is an external link.

### Panel button `<a href="/contact-us/">`
- text: `Start Your Project with Designally`
- display: inline-block
- width: 332.727px; height: 55.203px
- padding: **16px 32px**
- border: **2px solid rgb(255, 255, 255)**
- border-radius: 200px
- color: rgb(255, 255, 255); background: transparent
- font-family: Poppins; font-size: 16px; font-weight: 500; line-height: 19.2px
- text-align: center
- transition: 0.3s
- y = 2478 (about 55px below the last nav row)

### Card column
- width: 356.25px, starting at **x = 891**
- Contains the 5 `ServiceCard`s at these absolute tops (heights for reference):
  | card | anchor id | top | height |
  |---|---|---|---|
  | Brand Core | `Branding` | 1778 | 655 |
  | Brand Visuals | — | 2593 | 631 |
  | Brand Execution | — | 3384 | 631 |
  | Website + Dev | `Website` | 4174 | 697 |
  | Design Support | `DesignAlly` | 5031 | 655 |

  Gaps between cards: 160px, 160px, 159px, 160px → use a **160px gap** in a flex column.

## States & Behaviors

### Sticky (scroll-driven)
- **Trigger:** normal `position: sticky` — the panel pins at `top: 0` once the section's top passes
  the viewport top, and releases at the section's bottom.
- **State A (before pin):** panel scrolls with the page.
- **State B (pinned):** panel fixed at viewport top while the card column continues scrolling.
- **No transition** — sticky is layout-driven, not animated.
- **Implementation approach:** plain CSS `position: sticky; top: 0` on the panel, with the section as
  the containing block. Add `desk:sticky` so it only applies at ≥1025px.

### Hover — nav rows
Measured site rule:
`.elementor-element-c4ccf10:hover h1 { transition: 0.3s; color: rgb(33, 33, 33) !important; }`
- **State A:** label color rgb(255, 255, 255)
- **State B (row hover):** label color **rgb(33, 33, 33)**
- **Transition:** 0.3s
- Applies to all four rows.

### Hover — panel button
- **State A:** transparent background, white text, 2px white border
- **State B:** background rgb(255, 255, 255), color rgb(245, 99, 65)
- **Transition:** 0.3s

### What does NOT happen
- The numbered rows do **not** gain an active state as the user scrolls. There is no
  IntersectionObserver, no scroll-spy, no highlight. Do not add one.
- There are 4 rows but 5 cards — the three BRANDING cards all sit under the `#Branding` anchor.

## Assets
- `ArrowUpRightIcon` from `../shared/icons`.
- No images in the panel itself.

## Text Content (verbatim)
Heading: `OUR SERVICES` (with the `I` of SERVICES italicised via `<i>`)

Paragraph:
> We provide comprehensive design solutions for every business—from branding to website development and ongoing creative support—tailored to what your brand truly needs.

Rows: `01 Branding` · `02 Website Development` · `03 Design Support` · `04 Online Brand Guide`

Button: `Start Your Project with Designally`

## Responsive Behavior
- **Desktop (≥1025px):** panel sticky, 712.5px wide with the 0/80/80/0 radius; cards in a 356.25px
  column to its right.
- **Tablet (768–1024px):** sticky is **off**. The panel becomes a normal full-width block that
  scrolls above the card list. Keep the orange background and the right-side rounding.
- **Mobile (≤767px):** same as tablet, single column; panel padding reduces and the heading scales
  down with the container.

## Build notes
- Import and render `ServiceCard` (built separately) — do not inline the card markup here.
- The panel's left edge bleeds to x=0 while its text starts at the container's left edge (x=178).
  Achieve this with a full-bleed panel plus internal left padding equal to the container gutter.
- `"use client"` is not required — sticky and hover are pure CSS.
- Verify `npx tsc --noEmit` passes before finishing.
