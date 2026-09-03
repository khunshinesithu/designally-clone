# Case-study detail page — `/works/<slug>/`

Six pages, one Elementor `single-post` template. Built as a single dynamic route
(`src/app/works/[slug]/page.tsx`) rendered per slug, not six hand-built pages.

Everything below is `getComputedStyle` / `getBoundingClientRect` output from the
live Skytower page at 1440x900. Content width is 1425px (1440 less the scrollbar).

## Section map

| # | Section | y | height | width |
|---|---|---|---|---|
| 0 | Hero | 0 | 900 | 1425 (full-bleed) |
| 1 | Intro | 900 | 1225 | 1200 centred, x=113 |
| 2 | Gallery | 2125 | 3563 | 1425 (full-bleed) |
| 3 | Next up | 5688 | 845 | 1200 centred |
| — | CTA (shared) | 6373 | 669 | overlaps §3 by 160px via its wave |
| — | Footer bar | 7042 | 57 | |

Document height 7099.

## 0 — Hero

A **background video, not an image**: `data-settings` is
`{"background_background":"video","background_video_link":"https://youtu.be/<id>"}`
rendered as a YouTube iframe 1600px wide inside the 1425px band. No text, no
images, no `<video>` element — which is why a naive image/video count reports
zero for this section.

All six pages use one. Ids: Skytower `WgIss0UmK2k`, Bitazza `ZzjDiWE8eE8`,
Laga `vyiphDeEHjY`, INN News `fz1JDTs6Lus`, Nourigo `BjiT9wwjvFA`,
Fatcoco `J-4UscdtFaE`.

Kept as embeds in the clone. Autoplay needs `mute=1`, and looping a single video
needs `loop=1&playlist=<id>`.

## 1 — Intro

Two columns inside the 1200px box. Left 728px, right 300px at x=1001.

| Element | Font | Colour | Position |
|---|---|---|---|
| Client eyebrow (h2) | Poppins 20/26 600 | `#F56341` | x=113 y=1060 |
| Headline (h1) | EB Garamond 64/77 500 | `#212121` | x=113 y=1110, w=728 |
| Body (p) | Poppins 16/24 400 | `#212121` | w=728 |
| Visit link (a) | Poppins 16/19 500 | `#F56341` | y=1760 |
| "About Project" / "What We Did" (h3) | Poppins 20/26 500 | `#212121` | **x=1027** — indented 26px past the values |
| Meta labels (h3) | Poppins 16/19 700 | `#F56341` | x=1001 |
| Meta values (h3) | Poppins 16/24 400 | `#212121` | x=1001 |

Meta rows are CLIENT, INDUSTRY, SERVICE, DURATION, on a 76px pitch.

"What We Did" tags are pills: `inline-block`, padding `8px 16px`, border
`1px solid #F56341`, radius `200px`, white background, `#212121` text,
16/24 400, 42px tall. They wrap; count varies 2–21 per project.

## 2 — Gallery

**Full-bleed** — `padding: 0`, x=0, the full 1425px. It deliberately escapes the
1200px container the rest of the page uses.

An ordered run of WordPress block galleries (`figure.wp-block-gallery`, always
`columns-2 is-cropped alignfull`) and standalone `<video>` elements:

- a figure with **one** image fills the row: 1425x1425
- a figure with **two or more** lays out two-up: 713x713 each, **no gaps**

`is-cropped` forces squares regardless of source aspect (sky01 is 1920x961 and
still renders 1425x1425), so `object-fit: cover` on a square box.

Videos are `autoplay loop muted`, full width, no controls — decorative.

### Two extraction traps

1. **Every image is lazy-loaded.** `src` is a 1x1 transparent GIF on all of
   them; the real URL is in `data-src`. Videos too.
2. **Each image has a `<noscript>` twin.** Counting both doubles every gallery —
   Skytower reports 14 images where 7 render.

## 3 — Next up

| Element | Font | Position |
|---|---|---|
| "Next up" (h2) | Poppins 20/26 600, `#F56341` | centred, y=5848 |
| Client (h2) | EB Garamond 64/83.2 500, `#212121` | centred, y=5882 |
| Banner (img) | — | 1200x400 (3:1) at x=113 y=6053 |

The six form a closed ring:

    skytower → fatcoco → bitazza → nourigo → laga → inn-news → skytower

### Two faults in the original, reproduced or fixed

1. **Three of the four anchors in this block link to the current page**, not the
   next one. Only one carries the real destination. The clone links correctly.
2. **The destination is an alias slug** — the page's own H1 slugified, e.g.
   Fatcoco is reached as `/works/harmonizing-brand-guidelines-and-web-design/`
   as well as `/works/fatcoco-fb-website-project/`. The extractor maps aliases
   back to canonical slugs by matching the slugified title.
3. **Nourigo's "Next up: Laga" shows a Nourigo banner** (`Nourigo_footer-scaled.jpg`)
   rather than Laga's. Reproduced as-is; the banner is stored per page rather
   than derived from the linked project so an editor can correct it.

## Content shape

| Project | Body ¶ | Tags | Gallery media |
|---|---|---|---|
| Skytower | 3 | 13 | 7 |
| Bitazza | 2 | 8 | 9 |
| Laga | 4 | 21 | 7 |
| INN News | 2 | 17 | 7 |
| Nourigo | 3 | 17 | 7 |
| Fatcoco | 1 | 2 | 4 |

47 distinct assets: 38 images (24MB) and 9 videos (132MB).
