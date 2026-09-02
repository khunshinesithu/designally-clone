# HeroShowcase Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/HeroShowcase.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-02-hero.png`
- **Interaction model:** **time-driven carousel (autoplay) + click-to-slide.** Not a static video.
- Source element: `.elementor-element-c3b73fa` → Elementor nested carousel (`.e-n-carousel`, Swiper)

## Carousel parameters (read from the live Swiper instance — use these exactly)
| Param | Value |
|---|---|
| loop | `true` |
| autoplay.delay | **10000 ms** |
| autoplay.disableOnInteraction | `false` |
| speed | **500 ms** |
| slidesPerView | 1 |
| spaceBetween | **40px** |
| effect | slide (default) |

Real slides: **4**. (The live DOM shows 6 because Swiper clones the first and last for looping —
do not build clones; use a looping carousel implementation.)

## DOM Structure
```
<section>                        full width
  └ <div class="dsg-container">  max-width 75%, display flex column, gap 20px
      └ carousel viewport        overflow hidden
          └ track                display flex, gap 40px, transform: translateX(...)
              └ slide × 4        width 100% of viewport
                  └ <div>        display flex, column, gap 40px
                      ├ video card    height 702px, border-radius 48px, overflow hidden
                      │   └ <video>   object-fit: cover, autoplay loop muted playsInline
                      └ caption row   display flex, row, justify-content: space-between, height 41.6px
                          ├ <h1>      per-slide headline
                          └ label row display flex, justify-end, align-center, gap 16px
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Section root
- display: flex; flex-direction: column
- width: 1425px (100%); height: 803.602px
- position: relative

### Container
- width: 1068.75px (`max-width: 75%`), margin-inline: auto
- display: flex; flex-direction: column; gap: 20px
- height: 803.602px

### Carousel viewport
- width: 1068.75px; height: 783.602px
- overflow: hidden; position: relative; z-index: 1

### Slide
- width: 1069px; height: 783.602px
- margin-right: 40px (this is `spaceBetween`)
- inner wrapper: display flex; flex-direction: column; gap: 40px

### Video card
- width: 1069px; height: **702px**
- **border-radius: 48px**
- overflow: hidden
- transition: opacity 1s
- `<video>`: width 1069px; height 702px; object-fit: **cover**; autoplay, loop, muted, playsInline

### Caption row
- display: flex; flex-direction: row; justify-content: space-between
- height: 41.602px
- (sits 40px below the video card via the slide's `gap: 40px`)

### Headline `<h1>` (left)
- width: 507.367px
- font-family: **EB Garamond**
- font-size: 32px
- font-weight: 500
- line-height: 41.6px
- color: rgb(33, 33, 33)

### Client label row (right)
- width: 427.594px
- display: flex; flex-direction: row; justify-content: flex-end; align-items: center; **gap: 16px**

### Client label `<a>`
- display: inline-block
- font-family: Poppins; font-size: **18px**; line-height: 21.6px
- color: rgb(33, 33, 33)
- background-color: rgba(2, 1, 1, 0) (transparent)
- text-align: center
- transition: 0.3s
- **font-weight: 400 normally, 600 for the label matching the active slide**

### `/` separator
- `font-family: Poppins; font-size: 18px; font-weight: 400; line-height: 21.6px; color: rgb(33, 33, 33)`
- width 8.57px. Rendered between labels — 3 separators for 4 labels.

## States & Behaviors

### Autoplay (time-driven)
- **Trigger:** every 10000 ms, advance one slide; wrap around (loop).
- **Transition:** 500 ms slide translate.
- Interaction does **not** disable autoplay (`disableOnInteraction: false`).

### Click-to-slide  ← from the site's own inline script
Each client label is a `.go-to-slide.slide-N` control. The live behaviour is:
1. If the clicked label's slide is **already active** → let the link navigate normally to its href.
2. If it is **not** active → `preventDefault()` and move the carousel to that slide instead.

Reproduce exactly that two-step rule.

### Active-label emphasis
- The label whose slide is showing renders at `font-weight: 600`; the other three at `400`.
- No colour change — all four stay rgb(33, 33, 33).

### Hover — client labels
- transition: 0.3s. Colour rgb(33, 33, 33) → rgb(245, 99, 65) on hover.

## Per-State Content — the 4 slides, in order

### Slide 1 — Bitazza
- video: `/sites/designally-co-e422ade5/root-8a5edab2/videos/INTRO-Bitazza.mp4`
- headline: `Your Creative Design Ally.`
- bold label: **Bitazza** → `https://designally.co/works/bitazza-design-support-and-website/`

### Slide 2 — INN News
- video: `/sites/designally-co-e422ade5/root-8a5edab2/videos/Intro-LOGO-INN-News.mp4`
- headline: `Transforming Brands Through Design.`
- bold label: **INN News** → `https://designally.co/works/inn-news-rebranding-and-website-projects/`

### Slide 3 — Nourigo
- video: `/sites/designally-co-e422ade5/root-8a5edab2/videos/Intro-VDO-NouriGo.mp4`
- headline: `Simplifying Design, Amplifying Impact.`
- bold label: **Nourigo** → `https://designally.co/works/nourigo-supplements-branding-project/`

### Slide 4 — Laga
- video: `/sites/designally-co-e422ade5/root-8a5edab2/videos/Intro-LAGA.mp4`
- headline: `Crafting Foundation for Lasting Brand Success.`
- bold label: **Laga** → `https://designally.co/works/laga-branding-and-website-project/`

### Label row (identical on every slide, order fixed)
`Bitazza / INN News / Nourigo / Laga`

Non-active label hrefs (use these for every slide; only the bold one changes per slide):
| Label | href |
|---|---|
| Bitazza | https://designally.co/works/long-term-trusted-design-partner/ |
| INN News | https://designally.co/works/revitalizing-innnews-a-comprehensive-rebranding-journey/ |
| Nourigo | https://designally.co/works/crafting-a-compelling-brand-identity-for-supplementary-smoothies/ |
| Laga | https://designally.co/works/lagas-eco-friendly-brand-journey-from-inception-to-launch/ |

## Assets
All four videos are already downloaded to
`public/sites/designally-co-e422ade5/root-8a5edab2/videos/`:
`INTRO-Bitazza.mp4`, `Intro-LOGO-INN-News.mp4`, `Intro-VDO-NouriGo.mp4`, `Intro-LAGA.mp4`
(each 1920×1080 source). No images, no icons.

## Responsive Behavior
- **Desktop (1440):** as specified — video card 702px tall, caption row side by side.
- **Tablet (768) / Mobile (390):** the container narrows (88% / 90%), the video card scales with it.
  The caption row stacks: headline above the label row on mobile, since 507px + 428px cannot fit.
  Keep `justify-content: space-between` at ≥1025px and switch to a column with a small gap below that.
- The video keeps `object-fit: cover` at every width; the 48px radius is constant.

## Build notes
- `"use client"` — autoplay timer plus click handling.
- Do not add a carousel library; a transform-based track with a 500ms transition is enough.
- Videos must be `muted` and `playsInline` or mobile browsers will refuse to autoplay.
- Prefix video paths with `/sites/designally-co-e422ade5/root-8a5edab2/videos/`.
- Verify `npx tsc --noEmit` passes before finishing.
