# CaseStudySection Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/CaseStudySection.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-07-casestudy.png`
- **Interaction model:** static + hover on the cards.
- Source element: `.elementor-element-615fd02`; cards `.elementor-element-3db6188`

Heading block plus a 2×2 grid of four linked case-study cards. The card is simple enough to live in
this same file as a local `CaseStudyCard` sub-component.

## DOM Structure
```
<section>
  └ <div class="dsg-container">   padding 160px 0, flex column
      ├ heading row              "Case Study" left · "Unveiling Success Stories of our clients" right
      └ grid                     2 columns × 2 rows of <a> cards
          └ <a>                  flex column
              ├ <img>            522.375 × 293.836, radius 16px
              ├ <h2>             client name
              └ meta row         "<industry> / <services>"
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Section root
- width: 1425px (100%); height: 1357.67px
- display: flex; flex-direction: column; position: relative

### Container
- **padding: 160px 0**
- width: 1068.75px (`max-width: 75%`), margin-inline auto
- display: flex; flex-direction: column

### Heading — left group
Two `<h1>` on one line:
- font-family: **Poppins**; font-size: **40px**; font-weight: 500; line-height: **52px**
- `Case` — color rgb(33, 33, 33), width 104.086px
- `Study` — color **rgb(245, 99, 65)**, width 115.406px
- They sit side by side with a small gap (x = 220 and 336 at 1440).

### Heading — right group
Three `<h2>` on one line, right-aligned (`text-align: end`):
- font-family: Poppins; font-size: **20px**; font-weight: 500; line-height: **26px**
- `Unveiling` — color rgb(33, 33, 33)
- `Success Stories` — color **rgb(245, 99, 65)**
- `of our clients` — color rgb(33, 33, 33)
- The heading row is a `justify-content: space-between` row: left group at the container's left edge,
  right group flush right.

### Grid
- 2 columns × 2 rows
- Card width: **522.375px**; card height: 373.234px
- **Column gap ≈ 24px** (cards at x = 178 and x = 725; 725 − 178 − 522.375 = 24.6)
- **Row gap ≈ 56px** (rows at y = 8508 and y = 8937; 8937 − 8508 − 373.234 = 55.8)
- The grid starts ~292px below the section top (heading block + spacing).

### Card `<a>`
- display: flex; flex-direction: column
- width: 522.375px; height: 373.234px
- position: relative
- transition: background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.4s

### Card image
- width: 522.375px; height: 293.836px
- **border-radius: 16px**
- **overflow: clip**
- aspect-ratio: **800 / 450**
- Natural source size 800 × 450.

### Card title `<h2>`
- font-family: Poppins; font-size: **18px**; font-weight: 500; line-height: **23.4px**
- color: rgb(33, 33, 33)
- width: 522.375px
- Sits **24px** below the image (image bottom 8801.8 → title y 8826).

### Card meta row
Three inline `<span>`s: industry, a `/` separator, then the services list.
- font-family: Poppins; font-size: **16px**; font-weight: 400; line-height: **24px**
- color: **rgb(114, 120, 164)**  ← a muted blue-grey, not the body ink
- Sits ~8px below the title (title bottom 8849.4 → meta y 8857).
- The separator `/` is its own span, width 18.82px, same colour.

## States & Behaviors

### Hover — card
- The card's own `transition` includes `transform 0.4s` and `box-shadow 0.3s`.
- No measured hover rule changes colour on these cards. Apply a restrained treatment consistent with
  the site: image `transform: scale(1.03)` inside the 16px radius (`overflow: clip` already clips it),
  over the card's `0.4s` transform transition. Title and meta colours stay unchanged.

### Scroll / click / time
No scroll behaviour. Each card is a plain link.

## Per-State Content — the four cards, in order (2×2 reading order)

| # | image | title | industry | services | href |
|---|---|---|---|---|---|
| 1 | `Skytower-1024x576.jpg` | `Skytower` | `Industrial & Manufacturing` | `Branding / Website` | https://designally.co/works/skytower-rebranding-and-website-projects/ |
| 2 | `Bitazza-1024x576.jpg` | `Bitazza Thailand/Global` | `Financial Services` | `Design Support / Website` | https://designally.co/works/bitazza-design-support-and-website/ |
| 3 | `LAGA-1024x576.jpg` | `Laga` | `Consumers Products` | `Branding / Website` | https://designally.co/works/laga-branding-and-website-project/ |
| 4 | `INN-News-1024x576.jpg` | `INN News` | `Corporate` | `Branding / Website` | https://designally.co/works/inn-news-rebranding-and-website-projects/ |

Image paths: `/sites/designally-co-e422ade5/root-8a5edab2/images/<filename>` — all four are already
downloaded (natural 800 × 450).

The meta line renders as `<industry> / <services>` — e.g. `Industrial & Manufacturing / Branding / Website`.

## Assets
- 4 images in `public/sites/designally-co-e422ade5/root-8a5edab2/images/`
- No icons.

## Text Content (verbatim)
Heading: `Case` `Study` — `Unveiling` `Success Stories` `of our clients`
Cards: see the table above.

## Responsive Behavior
- **Desktop (≥1025px):** 2×2 grid, 522.375px cards, heading row split left/right.
- **Tablet (768–1024px):** stays 2 columns but cards fill the container; heading `Case Study` ~32px
  and the right group drops to its own line under it.
- **Mobile (≤767px):** single column, cards full width; heading stacks — `Case Study` then the
  `Unveiling Success Stories of our clients` line left-aligned beneath it; row gap reduces to ~40px.
- The image keeps its 800/450 aspect ratio and 16px radius at every width.

## Build notes
- Server component — no `"use client"`.
- Type the four entries with `DsgCaseStudy` from `@/types/designally`. Note that type has `meta` as a
  single string; either build the meta line as `"<industry> / <services>"` or extend the shape locally
  — but keep the rendered text identical to the table.
- Use `.dsg-container`.
- Use CSS Grid for the 2×2 (`grid-cols-2`, `gap-x-[24px] gap-y-[56px]`).
- Verify `npx tsc --noEmit` passes before finishing.
