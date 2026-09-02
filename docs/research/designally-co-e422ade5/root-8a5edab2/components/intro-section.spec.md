# IntroSection Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/IntroSection.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-03-intro.png`
- **Interaction model:** static (button hover only).
- Source element: `.elementor-element-7f149c2`

## DOM Structure
```
<section>                        display flex column, height 722.898px
  └ <div class="dsg-container">  two columns, side by side
      ├ left  (630.766px)  display flex column, gap 24px
      │   ├ logo image     190 × 44.492
      │   ├ <h1>           headline with orange spans
      │   ├ <p>            paragraph, width 592px
      │   └ <a>            "Explore More" pill button
      └ right (317.984px)  display flex column, align-items center, gap 20px
          └ cog SVG image  317.984 × 207.266
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Section root
- display: flex; flex-direction: column
- position: relative
- width: 1425px (100%); height: 722.898px
- Content starts 160px below the section top → **padding: 160px 0** (section top y=956, first child y=1116).

### Left column
- display: flex; flex-direction: column; **gap: 24px**
- width: 630.766px; height: 402.898px
- x = 178 (container left edge)

### Logo image
- `<img>` display: inline-block; width: **190px**; height: 44.492px
- src: `/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Primary-Logo.png`
- natural size 800 × 187, alt: `""` (decorative — keep it empty)

### Headline `<h1>`
- width: 630.766px; height: 124.805px
- font-family: **Poppins**
- font-size: 32px
- font-weight: 500
- line-height: 41.6px
- color: rgb(33, 33, 33)
- Three words are wrapped in orange spans — exact source markup:
  ```html
  We are your creative partner—ready to build <span style="color: #F56341">brands</span>,
  <span style="color: #F56341">websites</span> and <span style="color: #F56341">creative assets </span>
  that elevate your business.
  ```
  Note the trailing space inside the third span — reproduce the text exactly, including the
  em-dash in `partner—ready`.

### Paragraph `<p>`
- width: **592px**; height: 96px
- margin-bottom: 14.4px
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- color: rgb(33, 33, 33)

### "Explore More" button `<a href="/about/">`
- display: inline-block
- width: 166.164px; height: 51.203px
- padding: **16px 32px**
- border-radius: **200px**
- background-color: rgb(245, 99, 65)
- color: rgb(255, 255, 255)
- font-family: Poppins; font-size: 16px; font-weight: 500; line-height: 19.2px
- text-align: center
- border: none
- transition: 0.3s

### Right column
- display: flex; flex-direction: column; align-items: center; gap: 20px
- width: 317.984px; height: 207.266px
- x = 929, y = 1214 — it is vertically offset from the left column's top (starts ~98px lower).
  Reproduce by aligning the right column to the vertical centre of the row.

### Cog image
- `<img>` width: 317.984px; height: 207.266px
- src: `/sites/designally-co-e422ade5/root-8a5edab2/images/Cog_Designally.svg`
- natural size 382 × 249, alt: `""` (decorative)

## Vertical rhythm inside the left column (measured absolute y at 1440)
| Element | y | height |
|---|---|---|
| logo | 1116 | 44.49 |
| headline | 1184 | 124.81 |
| paragraph | 1333 | 110.40 (incl. 14.4 margin) |
| button | 1468 | 51.20 |

Each step is exactly the previous element's bottom + the 24px column gap.

## States & Behaviors

### Hover — "Explore More" button
- Site rule: `.elementor-button:hover, :focus { color: rgb(255, 255, 255) }` — the text stays white.
- **State A:** background rgb(245, 99, 65), color rgb(255, 255, 255)
- **State B (hover):** background rgb(247, 130, 103) (`--e-global-color-accent`), color rgb(255, 255, 255)
- **Transition:** 0.3s

### Scroll / click / time
N/A — the section is static.

## Per-State Content
N/A — single state.

## Assets
- `Designally-Primary-Logo.png` — `/sites/designally-co-e422ade5/root-8a5edab2/images/`
- `Cog_Designally.svg` — `/sites/designally-co-e422ade5/root-8a5edab2/images/`
- No icons from the icon module.

## Text Content (verbatim)
Headline:
> We are your creative partner—ready to build **brands**, **websites** and **creative assets** that elevate your business.

Paragraph:
> At Designally, we create strong foundations for brands through thoughtful design. Our work helps businesses grow with clarity and consistency, ensuring your brand communicates confidently, meaningfully, and memorably to the right audience.

Button: `Explore More` → `/about/`

## Responsive Behavior
- **Desktop (≥1025px):** two columns side by side as specified; right column vertically centred.
- **Tablet (768–1024px):** columns remain side by side but narrow with the container (88%);
  the cog image shrinks proportionally.
- **Mobile (≤767px):** stacks to a single column — logo, headline, paragraph, button, then the cog
  image below, centred. Paragraph width becomes 100% instead of 592px.

## Build notes
- Use `next/image` with explicit width/height for both images (the SVG can use a plain `<img>` if
  next/image complains about the unoptimized SVG — either is acceptable).
- Use `.dsg-container`.
- No client-side JS needed — keep this a server component.
- Verify `npx tsc --noEmit` passes before finishing.
