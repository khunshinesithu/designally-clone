# ServiceCard Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/ServiceCard.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/state-header-scrolled-1500.png`
  (right column shows the "BRANDING / Brand Core" card in full)
- **Interaction model:** static, with hover on the pill tags.
- Source elements: `.elementor-element-e0259ac`, `8784e54`, `2217146`, `062cf37`, `4df91be`

One reusable component rendered five times by `ServicesSection`. Export the five cards' data from
this file (or accept it as props typed with `DsgServiceCard` from `src/types/designally.ts`).

## DOM Structure
```
<article id={anchorId}>          width 356.25px, display flex column
  ├ eyebrow row                  display flex, align-items center, height 36px
  │   ├ DoubleChevronIcon        11 × 24
  │   └ <h3>                     eyebrow label
  ├ <h1>                         card title
  ├ <p>                          description
  ├ tag list                     display flex, flex-wrap, gap 8px
  │   └ <span> × n               pill tags
  └ <img>                        card image
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Card root
- width: **356.25px**
- display: flex; flex-direction: column
- Anchor: cards 1, 4 and 5 carry an `id` (`Branding`, `Website`, `DesignAlly`) used by the sticky
  panel's in-page links. Render it on the card root (or an offset anchor span at its top).

### Eyebrow row
- display: flex; align-items: center; height: 36px
- gap: icon at x=891, label at x=917 → **~26px between icon and label**
- Icon: `DoubleChevronIcon` from `../shared/icons`, viewBox `0 0 18 40`, rendered **11 × 24**.
  Its two fills are hard-coded (#F78267 / #F56341) — do not recolour.
- `<h3>` label:
  - font-family: Poppins; font-size: **20px**; font-weight: 500; line-height: 26px
  - color: rgb(33, 33, 33)

### Title `<h1>`
- width: 356.25px; height: 43.203px
- font-family: Poppins
- font-size: **43.2px**
- font-weight: **600**
- line-height: 43.2px
- color: rgb(33, 33, 33)
- Sits **24px** below the eyebrow row.

### Description `<p>`
- width: 356.25px
- font-family: Poppins; font-size: **15px**; font-weight: 400; line-height: **22.5px**
- color: rgb(33, 33, 33)
- Sits **24px** below the title.

### Tag list
- display: flex; flex-wrap: wrap
- **gap: 8px** (measured: first tag 891→989, second starts at 996)
- Sits **24px** below the description.

### Tag pill `<span>`
- display: inline-block
- height: **34px**
- padding: **8px 16px**
- border: **1px solid rgb(245, 99, 65)**
- border-radius: **200px**
- color: rgb(245, 99, 65)
- background: transparent
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 16px
- text-align: center
- transition: 0.3s

### Card image
- width: 356.25px, natural source 800 × 501 → **aspect-ratio ≈ 1.597** (use `800 / 501`)
- Sits below the tag list.
- Rounded corners to match the site's card treatment; measured radius on the source image container
  is the browser default (0) — keep it square unless the QA diff shows otherwise.

## States & Behaviors

### Hover — tag pills
Measured site rule (applies to every tag button on the page):
```
.elementor-button:hover, .elementor-button:focus { color: var(--e-global-color-primary); }
```
with `--e-global-color-primary: #F56341`.
- **State A:** color rgb(245, 99, 65), transparent background, 1px orange border
- **State B (hover):** background rgb(245, 99, 65), color rgb(255, 255, 255)
- **Transition:** 0.3s

### Scroll / click / time
N/A — the card itself is static. The section's sticky behaviour is `ServicesSection`'s concern.

## Per-State Content — all five cards, in order

### 1. Brand Core  (`id="Branding"`)
- eyebrow: `BRANDING`
- title: `Brand Core`
- description: `We uncover and define your brand’s essence its nature, purpose, and direction to build clarity, differentiation, and communication that truly resonates with your audience.`
- tags: `Naming`, `Brand Story`, `Core Values, Vision, Mission`, `Tagline`, `Brand Archetype`, `Brand Personality`
- image: `/sites/designally-co-e422ade5/root-8a5edab2/images/brandcore.jpg`

### 2. Brand Visuals
- eyebrow: `BRANDING`
- title: `Brand Visuals`
- description: `We design essential visual elements for both online and offline communication, guided by your brand identity to make your presence distinct, cohesive, and memorable.`
- tags: `Logo Design`, `Typography`, `Color Scheme`, `Logo Guideline`, `Graphic Elements`
- image: `/sites/designally-co-e422ade5/root-8a5edab2/images/brandvisual.jpg`

### 3. Brand Execution
- eyebrow: `BRANDING`
- title: `Brand Execution`
- description: `Every touchpoint is a chance to impress. We equip your brand with clear, consistent, and well-crafted communication delivered with precision.`
- tags: `Collateral`, `Social Media Template`, `Package Design`, `Motion Graphic`, `Print Design & Production`
- image: `/sites/designally-co-e422ade5/root-8a5edab2/images/brandexc.jpg`

### 4. Website + Dev  (`id="Website"`)
- eyebrow: `WEBSITE`
- title: `Website + Dev`
- description: `We design and develop websites that reflect your brand with clarity—optimized for user experience, search visibility, and digital performance to support your growth.`
- tags: `Informative`, `Corporate`, `E-Commerce`, `Booking Platform`, `Web Application`, `Sales Page`, `Investor Relation`
- image: `/sites/designally-co-e422ade5/root-8a5edab2/images/website.jpg`

### 5. Design Support  (`id="DesignAlly"`)
- eyebrow: `Your Design Ally`   ← note: mixed case, not uppercase like the others
- title: `Design Support`
- description: `Our design support covers all your creative needs—per project or monthly—with a professional team, clear workflow and designs that meet your goals.`
- tags: `Design Outsourcing`, `Graphic Design`, `Package Design`, `Motion Graphic`, `Print Design & Production`
- image: `/sites/designally-co-e422ade5/root-8a5edab2/images/designsupport.jpg`

Reproduce the punctuation exactly, including the curly apostrophe in `brand’s` and the em-dashes in
cards 4 and 5.

## Assets
- 5 images, all already downloaded to `public/sites/designally-co-e422ade5/root-8a5edab2/images/`:
  `brandcore.jpg`, `brandvisual.jpg`, `brandexc.jpg`, `website.jpg`, `designsupport.jpg`
  (each 800 × 501 natural)
- `DoubleChevronIcon` from `../shared/icons`

## Text Content (verbatim)
See "Per-State Content" above — every string there is copied verbatim from the live site.

## Responsive Behavior
- **Desktop (≥1025px):** 356.25px wide column, title at 43.2px.
- **Tablet (768–1024px):** card fills the container width; title scales down (~36px) so it does not
  wrap awkwardly; tags keep wrapping at 8px gaps.
- **Mobile (≤767px):** full width, title ~32px, description stays 15px/22.5px, image full width.

## Build notes
- Type the card data with `DsgServiceCard` from `src/types/designally.ts`.
- Tags are non-interactive on the live site's markup semantics (they are anchors with no href that
  matters) — render them as `<span>`s so they are not focusable dead links.
- Keep it a server component; the hover is pure CSS.
- Verify `npx tsc --noEmit` passes before finishing.
