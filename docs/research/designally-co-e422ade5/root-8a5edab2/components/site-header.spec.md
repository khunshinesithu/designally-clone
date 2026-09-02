# SiteHeader Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/SiteHeader.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-01-header.png`
- **Interaction model:** static (hover states only). It is NOT sticky — it scrolls away with the page.
- Source element: `.elementor-element-12a5b5d` ("header-1")

## DOM Structure
```
<header>                          root, full width
  └ <div class="dsg-container">   centred, max-width 75%
      ├ logo block      (25% — 267.188px)  → <a> wrapping the DESIGNALLY wordmark SVG
      ├ nav block       (50% — 534.375px)  → <ul> of 4 links
      └ contact block   (25% — 267.188px)  → CONTACT US pill button
```
The three blocks are flex children of the container: 267.188 + 534.375 + 267.188 = 1068.75px.

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Root `<header>`
- display: flex
- position: relative
- width: 1425px (i.e. 100%)
- height: 131.203px
- z-index: 999
- transition: background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.4s
- background: transparent
- **Do NOT reproduce the live site's `margin-top: -146px`.** That negative margin only cancels the
  spacer node Elementor injects for its sticky header. This clone renders the floating header as a
  pure fixed overlay with no spacer, so the correct value here is `margin-top: 0`.

### Container `.dsg-container`
- width: 1068.75px via `max-width: 75%`, `margin-inline: auto`
- padding: 40px 0
- height: 131.203px
- display: flex

### Logo block (25%)
- display: flex; justify-content: center; align-items: flex-start
- width: 267.188px; height: 51.203px
- `<a href="https://designally.co">` — display: inline-block; width: 214.398px; height: 20px; transition: 0.3s
- SVG: `viewBox="0 0 536 50"`, rendered 214.398 × 20, `fill: rgb(245, 99, 65)`
- Asset: `/sites/designally-co-e422ade5/shared/svg/designally-wordmark.svg`

### Nav block (50%)
- display: flex; justify-content: center; align-items: center; width: 534.375px; height: 51.203px
- `<ul>`: display: flex; justify-content: space-between; width: 432.414px; height: 51.203px
- `<li>`: display: flex; margin: 0 20px
- `<a>`:
  - font-family: Poppins
  - font-size: 16px
  - font-weight: 500
  - line-height: 19.2px
  - color: rgb(33, 33, 33)
  - text-transform: uppercase
  - padding: 16px 0
  - display: flex; align-items: center
  - transition: 0.4s
  - cursor: pointer

Items, in order (rendered widths for reference):
| Label | href | width |
|---|---|---|
| SERVICES | https://designally.co/services/ | 73.906px |
| WORKS | https://designally.co/works/ | 58.438px |
| ABOUT | https://designally.co/about/ | 53.844px |
| THOUGHTS | https://designally.co/thoughts/ | 86.227px |

### Contact block (25%)
- display: flex; justify-content: center; align-items: flex-end; width: 267.188px; height: 51.203px
- Button `<a href="/contact-us/">` text `CONTACT US`:
  - display: inline-block
  - width: 168.883px; height: 45.203px
  - padding: 12px 32px
  - border: 1px solid rgb(245, 99, 65)
  - border-radius: 200px
  - color: rgb(245, 99, 65)
  - background: transparent
  - font-family: Poppins; font-size: 16px; font-weight: 500; line-height: 19.2px
  - text-align: center
  - transition: 0.3s

## States & Behaviors

### Scroll
N/A — this header is not sticky and has no scroll-triggered state. It scrolls out of view normally.

### Hover — CONTACT US button
Site rule `.elementor-button:hover { color: rgb(255, 255, 255) }` combined with the element's own
orange border/background treatment.
- **State A:** color rgb(245, 99, 65), background transparent, border 1px solid rgb(245, 99, 65)
- **State B (hover/focus):** color rgb(255, 255, 255), background rgb(245, 99, 65), border unchanged
- **Transition:** 0.3s

### Hover — nav links
- The site uses Elementor's nav pointer styles; the measured link transition is `0.4s`.
- **State A:** color rgb(33, 33, 33)
- **State B (hover/focus):** color rgb(245, 99, 65)
- **Transition:** 0.4s

### Hover — logo
- transition: 0.3s; no colour change measured. Keep the transition, no visual change.

## Per-State Content
N/A — single state.

## Assets
- Wordmark: `/sites/designally-co-e422ade5/shared/svg/designally-wordmark.svg` (viewBox `0 0 536 50`)
- No raster images, no icons from the icon module.

## Text Content (verbatim)
- SERVICES
- WORKS
- ABOUT
- THOUGHTS
- CONTACT US

## Responsive Behavior
- **Desktop (≥1025px):** as specified above — inline nav visible, CONTACT US visible.
- **Tablet (768–1024px):** the nav block carries `elementor-hidden-tablet` → the inline nav is
  **hidden**. CONTACT US remains visible. A `MENU` toggle (hidden on desktop/tablet in the source)
  is not shown here either — at tablet the header shows logo + CONTACT US only.
- **Mobile (≤767px):** CONTACT US carries `elementor-hidden-mobile` → **hidden**. The inline nav is
  hidden too. Only the logo remains; navigation is handled by the floating header's hamburger.
- Container max-width steps: 75% desktop, 88% ≤1024px, 90% ≤767px (see `.dsg-container` in globals.css).

## Build notes
- Use `next/image` or a plain `<img>` for the wordmark SVG; it is a static asset, not an inline icon.
- Use the `.dsg-container` utility from `globals.css` rather than re-deriving the 75% width.
- Verify `npx tsc --noEmit` passes before finishing.
