# BreakLimitsSection Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/BreakLimitsSection.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-06-breaklimits.png`
- **Interaction model:** **static.** The element carries an Elementor motion-effect attribute, but the
  effect's speed is 0 and the measured `transform` is the identity matrix at scrollY 0 / 600 / 1500 /
  7600. **There is no parallax. Do not implement one.**
- Source element: `.elementor-element-9522506`

A purely typographic section: two small Poppins notes flanking four huge EB Garamond lines whose
alignment alternates.

## DOM Structure
```
<section>                    padding 160px 0, height 872px
  └ <div class="dsg-container">   flex column, gap 20px, height 552px
      ├ <p>    small note, left-aligned
      ├ <h1>   "Unlock brand"          centre
      ├ <h1>   "true potential"        left   (orange)
      ├ <h1>   "& fuel positive"       right  (orange)
      ├ <h1>   "transformation."       centre
      └ <p>    small note, right-aligned
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Section root
- **padding: 160px 0**
- width: 1425px (100%); height: 872px
- display: flex; flex-direction: column; position: relative; z-index: 0
- `transition: transform 1s cubic-bezier(0, 0.33, 0.07, 1.03), opacity 1s cubic-bezier(0, 0.33, 0.07, 1.03)`
  is present on the live element but never fires. Keeping it is harmless; omitting it is also fine.

### Container
- width: 1068.75px (`max-width: 75%`), margin-inline auto
- height: 552px
- display: flex; flex-direction: column; **gap: 20px**

### Top note `<p>`
- text: `Break the limits` `<br>` `of your brand.`
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- color: rgb(33, 33, 33)
- width: 213.75px; height: 48px
- **text-align: start** (left), sits at the container's left edge

### The four display lines `<h1>`
All four share:
- font-family: **EB Garamond**
- font-size: **92px**
- font-weight: 500
- line-height: **92px**
- width: **712.5px** (they are 712.5px-wide blocks centred inside the 1068.75px container)
- Each line sits 100px below the previous (92px line-height + the 20px container gap ≈ 100px in
  practice; use the flex gap and let the line-height do the rest).

| # | text (source HTML) | color | text-align |
|---|---|---|---|
| 1 | `Unlock br<i>a</i>nd` | rgb(33, 33, 33) | **center** |
| 2 | `true potential` | **rgb(245, 99, 65)** | **start** (left) |
| 3 | `&amp; fuel positive` → renders `& fuel positive` | **rgb(245, 99, 65)** | **end** (right) |
| 4 | `tr<i>a</i>nsformation.` | rgb(33, 33, 33) | **center** |

**Note the italic `a`.** Lines 1 and 4 wrap a single letter `a` in `<i>` — the same signature detail
used in "OUR SERV*I*CES". Reproduce exactly: `Unlock br<i>a</i>nd` and `tr<i>a</i>nsformation.`

### Bottom note `<p>`
- text: `Take your brand ` `<br>` `further than ever.`
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- color: rgb(33, 33, 33)
- width: 137.234px; height: 48px
- **text-align: end** (right), sits at the container's right edge

## States & Behaviors
- **Scroll:** none. Measured `transform: matrix(1,0,0,1,0,0)` at every scroll position tested.
- **Hover:** none — there are no links or interactive elements in this section.
- **Click / time:** none.

## Per-State Content
N/A — single static state.

## Assets
None. No images, no icons, no SVGs.

## Text Content (verbatim)
```
Break the limits
of your brand.

Unlock brand
true potential
& fuel positive
transformation.

Take your brand
further than ever.
```

## Responsive Behavior
- **Desktop (≥1025px):** as specified — 92px display type, 712.5px line blocks, alternating alignment.
- **Tablet (768–1024px):** display type scales to ~64px; the four lines take the full container width
  and keep their alternating alignment; the notes stay at the left/right edges.
- **Mobile (≤767px):** display type ~38–40px; all four lines become left-aligned (the alternating
  centre/left/right pattern collapses because the lines fill the width); section padding reduces to
  about 80px top and bottom.

## Build notes
- Server component — no `"use client"`, no scroll listener, no motion library.
- Use `.dsg-container`.
- Every value above is measured. Use arbitrary Tailwind values, e.g. `text-[92px]`, `leading-[92px]`,
  `py-[160px]`, `gap-[20px]`, `w-[712.5px]`.
- Verify `npx tsc --noEmit` passes before finishing.
