# FloatingHeader Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/FloatingHeader.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/state-header-scrolled-1500.png`
  (shows the revealed state at scrollY 1500 — orange D monogram top-left, circular hamburger beside it)
- **Interaction model:** **scroll-driven** (reveals at a 1000px threshold) + click-driven dropdown.
- Source element: `.elementor-element-0722474` ("header-2")

This is a compact overlay header that fades in once the user has scrolled past 1000px. It is
separate from `SiteHeader` and renders at page level, outside any section.

## DOM Structure
```
<div>                       position: fixed, top-left, transparent
  ├ <a> logo               circular D monogram, 52×52
  └ <div> toggle wrapper
      ├ <button>           circular hamburger, 51×51
      └ <nav>              dropdown, hidden until toggled
          └ 5 × <a>
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Root
- position: fixed; top: 0; left: 0
- width: 100% (1425px at a 1440 viewport) — the header spans the full viewport
  (CORRECTION: an earlier reading of 375px was a pre-layout artifact taken while the
  element was still `visibility: hidden`. Re-measured at scrollY 0 / 1100 / 1500 / 3000 /
  5800 / 8000: width is 1425px at every one, logo at x=80, toggle at x=1294.)
- height: 147px
- padding: 40px 80px
- display: flex; align-items: flex-start; justify-content: space-between
- background-color: rgba(255, 255, 255, 0)  (fully transparent — it floats over page content)
- z-index: 999
- transition: 0.3s

### Logo `<a href="https://designally.co">`
- display: inline-block; width: 52px; height: 52px
- color / fill: rgb(245, 99, 65)
- positioned at x=80, y=40 (i.e. the root's padding box)
- Icon: `DMonogramIcon` from `../shared/icons` — viewBox `0 0 56 56`, rendered 52×52.
  CSS fill overrides the path's own `fill="white"`, producing a solid orange disc with the D knocked out.

### Hamburger toggle
- width: 51px; height: 51px
- display: flex; align-items: center; justify-content: center
- padding: 6px
- margin: 0 0 0 2.75px
- border: 1.5px solid rgb(245, 99, 65)
- border-radius: 500px
- background: transparent
- color: rgb(245, 99, 65)
- positioned at x=1294, y=40 — flush to the right padding edge (1425 − 80 − 51)
- aria-label: `Menu Toggle`
- Inner glyph: 36×36 box, font-size 24px → render `MenuBarsIcon` at 24×24 inside a 36×36 box.
  When open, swap to `CloseIcon` (same box).

### Dropdown `<nav>`
- margin: 16px 0 0
- width: 53.75px (content-derived; let it size to content)
- background: transparent
- transition: max-height 0.3s, transform 0.3s
- Closed height is 0 — the live site collapses it with max-height.
- Links `<a class="elementor-item">`:
  - font-family: Poppins; font-size: 16px; font-weight: 500; line-height: 20px
  - color: rgb(33, 33, 33)
  - text-transform: uppercase
  - padding: 4px 0 4px 40px
  - display: flex; align-items: center; justify-content: right
  - height: 28px

Dropdown items, in order:
| Label | href |
|---|---|
| SERVICES | https://designally.co/services/ |
| WORKS | https://designally.co/works/ |
| ABOUT | https://designally.co/about/ |
| THOUGHTS | https://designally.co/thoughts/ |
| CONTACT | https://designally.co/contact-us/ |

## States & Behaviors

### Scroll-triggered reveal  ← the defining behavior
- **Trigger:** window scrollY crosses **1000px** (Elementor `sticky_effects_offset: 1000`).
- **State A — scrollY < 1000:**
  - transform: translateY(-134px)
  - opacity: 0
  - visibility: hidden
- **State B — scrollY ≥ 1000:**
  - transform: translateY(0)
  - opacity: 1
  - visibility: visible
- **Transition:** `0.3s` on all properties (the element's computed `transition` is exactly `0.3s`).
- **Implementation approach:** a `useEffect` scroll listener (passive) setting a boolean, or an
  IntersectionObserver on a 1000px-tall sentinel. Drive the three properties with a CSS transition.
  Keep `visibility` in the transition so the hidden header is not focusable/clickable.
- Active at **all breakpoints** (desktop, tablet, mobile).

### Dropdown toggle
- **Trigger:** click on the hamburger button.
- Closed → open: nav expands (`max-height` 0 → content height), glyph swaps hamburger → close.
- **Transition:** max-height 0.3s, transform 0.3s.
- Set `aria-expanded` on the button and toggle it.

### Hover
- Toggle button: transition `all`; no measured colour change. Keep the border/colour constant.
- Dropdown links: colour rgb(33, 33, 33) → rgb(245, 99, 65) on hover, matching the site's link rule.

## Per-State Content
Both states render the same markup; only visibility/transform and the dropdown differ.

## Assets
- `DMonogramIcon`, `MenuBarsIcon`, `CloseIcon` from
  `src/components/sites/designally-co-e422ade5/shared/icons.tsx`
- No raster images.

## Text Content (verbatim)
SERVICES · WORKS · ABOUT · THOUGHTS · CONTACT

## Responsive Behavior
- Identical at all three widths — a full-width fixed overlay, and the reveal threshold stays
  1000px. It is the only navigation on mobile, where `SiteHeader` hides both its inline nav and
  its CONTACT US button.
- The root IS full-width at every breakpoint; `justify-content: space-between` puts the
  logo left and the toggle right.

## Build notes
- Render once at page level (in `page.tsx`), not inside a section — it must overlay everything.
- `"use client"` is required (scroll listener + toggle state).
- Verify `npx tsc --noEmit` passes before finishing.
