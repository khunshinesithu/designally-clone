# CtaSection Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/CtaSection.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-08-cta.png`
- **Interaction model:** static (link hovers only).
- Source element: `.elementor-element-1caafeb`

The full-bleed orange closing block: a white wave divider along its top edge, centred copy, a phone
link circled by a hand-drawn scribble, a row of social icons, and a duck illustration bottom-left.

## DOM Structure
```
<section>                      background #F56341, height 669.102px, position relative
  ├ wave divider               absolute, top -1px, full width, height 160px, z-index -1, flipped
  └ <div class="dsg-container">  padding 160px 0 0, flex column, align-items center
      ├ <h2>                   small white line
      ├ <h1>                   huge white serif headline
      ├ phone link + scribble  "Click to Connect !" with the loop SVG behind it
      ├ social icon row        5 links
      └ duck illustration      bottom-left
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Section root
- **background-color: rgb(245, 99, 65)**
- width: 1425px (100%); height: 669.102px
- display: flex; flex-direction: column; position: relative

### Wave divider (top shape)
- `CtaWaveShape` from `../shared/icons` (viewBox `0 0 1000 100`, `preserveAspectRatio="none"`)
- Wrapper: **position: absolute; top: -1px; width: 100%; height: 160px; z-index: -1**
- **transform: matrix(-1, 0, 0, -1, 0, 0)** — i.e. `rotate(180deg)` (flipped both axes)
- The shape's fill is **white** — it masks the orange so the section's top edge reads as a
  white wave curving down into the orange.
- Because the wrapper is `z-index: -1`, it sits behind the section content but above the page
  background; give the section `position: relative` and let the wrapper be its first child.

### Container
- **padding: 160px 0 0** (no bottom padding)
- width: 1068.75px (`max-width: 75%`), margin-inline auto
- display: flex; flex-direction: column; **align-items: center**

### Small line `<h2>`
- text: `Open a new perspective for your brand.`
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- color: **rgb(255, 255, 255)**
- width: 316.391px; text-align: center

### Headline `<h1>`
- source HTML: `Let’s work toge<i>t</i>her.` ← the **t** in "together" is italic
- font-family: **EB Garamond**
- font-size: **96px**
- font-weight: 500
- line-height: **115.2px**
- color: rgb(255, 255, 255)
- width: 756.008px; text-align: center
- Note the curly apostrophe in `Let’s`.

### Phone link + scribble
- Text: `Click to Connect !`  →  `<a href="tel:0650055993">`
- font-size: **43px**; font-weight: 500; line-height: **51.6px**
- color: **rgb(51, 51, 51)**  ← dark ink on the orange, not white
- margin: **8px 0 16px**
- width: 467.156px; text-align: center
- Behind it sits `ScribbleUnderline` from `../shared/icons` (viewBox `0 0 500 150`,
  `preserveAspectRatio="none"`), **position: absolute**, 487.156 × 75.898, offset so it loops around
  the text (measured `top: 27.945px; left: 233.578px` with
  `transform: translate(-243.578px, -37.949px)` — i.e. centred on the text block).
  Stroke colour rgb(51, 51, 51).
- The live site renders the text inside an Elementor "animated headline" wrapper; the animation
  cycles nothing here — treat it as a static circled link.

### Social icon row
Five links, laid out in a centred row at y ≈ 10089 (about 130px below the phone link).
Each is `display: flex; justify-content: center; align-items: center`.
- Icon colour: **rgb(255, 255, 255)**
- transition: **color 0.3s**
- The live site uses Font Awesome 5 Brands glyphs. **Do not add a Font Awesome dependency** — render
  simple inline brand SVGs (or a small local icon set) at the measured sizes.

| # | href | glyph | size |
|---|---|---|---|
| 1 | `https://line.me/ti/p/%40designally` | LINE | 34px |
| 2 | `https://www.facebook.com/designallyco` | Facebook | 32px |
| 3 | `https://www.instagram.com/designally.co` | Instagram | 34px |
| 4 | `https://www.pinterest.com/Designallyco/` | Pinterest | 32px |
| 5 | `https://open.spotify.com/user/p4985b7mufaslr8c1cborig78` | Spotify | 32px |

Horizontal spacing: icons at x = 566, 629, 690, 754, 815 → roughly **20px between items**.
Give every link an `aria-label` (the source has empty link text) and `target="_blank"`
`rel="noopener noreferrer"`.

### Duck illustration
- `duck.svg`, viewBox `0 0 250 251`, rendered **120 × 121**
- Positioned at the **bottom-left of the container** (x = 171, y = 10123 — i.e. flush with the
  container's left edge, below the social row).
- Asset: `/sites/designally-co-e422ade5/shared/svg/duck.svg`

## States & Behaviors

### Hover — phone link
- transition on the surrounding elements is `color 0.3s`.
- **State A:** color rgb(51, 51, 51)
- **State B:** color rgb(255, 255, 255)
- **Transition:** 0.3s

### Hover — social icons
- **State A:** color rgb(255, 255, 255)
- **State B:** color rgb(51, 51, 51)
- **Transition:** color 0.3s

### Scroll / click / time
None. Nothing animates on scroll in this section.

## Per-State Content
N/A — single static state.

## Assets
- `CtaWaveShape`, `ScribbleUnderline` from `../shared/icons`
- `/sites/designally-co-e422ade5/shared/svg/duck.svg`
- Social brand glyphs: inline SVG you provide (no icon-font dependency)

## Text Content (verbatim)
```
Open a new perspective for your brand.
Let’s work together.
Click to Connect !
```
Phone: `tel:0650055993`

## Responsive Behavior
- **Desktop (≥1025px):** as specified — 96px headline, 43px phone link, wave 160px tall.
- **Tablet (768–1024px):** headline ~64px / line-height ~77px; phone link ~32px; wave ~120px tall.
- **Mobile (≤767px):** headline ~40px / line-height ~48px; phone link ~26px; the scribble scales with
  the text (it is `preserveAspectRatio="none"`, so bind its box to the text block, not a fixed size);
  social icons stay in one centred row; the duck shrinks to ~80px and stays bottom-left; container
  padding-top reduces to ~96px.
- The section stays full-bleed orange at every width.

## Build notes
- Server component — no `"use client"`.
- The wave divider must not intercept pointer events (`pointer-events-none`) and must sit behind the
  content; do not let its `z-index: -1` escape the section's stacking context.
- The scribble is decorative — `aria-hidden="true"`.
- Verify `npx tsc --noEmit` passes before finishing.
