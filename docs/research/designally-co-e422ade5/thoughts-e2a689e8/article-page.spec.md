# Article page — `/thoughts/<slug>/`

Nine posts, one Elementor `single-post` template. Built as a single dynamic
route (`src/app/thoughts/[slug]/page.tsx`).

Measured on the live "The Basic Fundamentals of Graphic Design" page at
1440x900. Content width 1425px.

## URL — a deliberate deviation

The original serves articles **at the site root**:
`https://designally.co/the-basic-fundamentals-of-graphic-design/`.

The clone nests them under `/thoughts/`. Matching the original would need a
root-level catch-all `/[slug]/`, which competes with `/about`, `/works`,
`/services`, `/contact-us` and every static route added later — one typo in the
matching order silently shadows a real page. The canonical still points at the
original URL, so search engines are told the truth.

## Section map

| # | Section | y | height | notes |
|---|---|---|---|---|
| 0 | Masthead | — | 0 | **`display: none` at desktop.** Mobile-only. |
| 1 | Featured image | 131 | 775 | 1200px box, inner padding `36px 0 0` |
| 2 | Body | 906 | varies | 1200px box, inner padding `96px 0 160px` |
| 3 | Next up | 6875 | 988 | inner padding `160px 0 320px` |
| — | CTA (shared) | 7703 | 669 | overlaps §3 by 160px via its wave |

Document height 8429 on that post.

The masthead being hidden is the trap: the category and date are only there, so
the visible page never shows them at desktop. The clone renders them above the
title, since the information is already in the CMS and useful.

## Featured image

1200x739 at y=167 — **no crop**, `object-fit: fill` on the natural aspect
(1536x946 source scaled to 1200 wide).

## Body

An **800px column centred** in the 1200px box (x=313).

| Element | Font | Colour | Margins |
|---|---|---|---|
| h1 (title) | Poppins 48/62 500 | `#212121` | 0 |
| p | Poppins 16/24 400 | `#212121` | bottom 14.4px |
| h4 | Poppins 24/29 500 | `#212121` | top 8px, bottom 16px |
| image | — | — | full 800px column |
| category / date | Poppins 18/23 400 | `#7278a4` | masthead only |

Stored as Portable Text. The markup is bounded — h1–h4, p, ul/ol, figure,
strong, a, br — so `scripts/extract-posts.mjs` converts it with a purpose-built
converter rather than pulling in `@portabletext/block-tools`.

## Next up

"Next" in `#212121` and "up" in `#F56341`, Poppins 40/52 500, with "Our latest
thoughts" (Poppins 20/24 500) linking to `/thoughts/`. One card: title
Poppins 32/38 500 and an orange "Read more".

Eight of the nine link to *Developing a Strong Brand Identity*; that post links
to *Annual Brand Health Check*. It is not a ring — the original's related-post
widget is near-static.

## Extraction traps

1. **Images are lazy-loaded** — the real URL is in `data-src`; `src` is a 1x1 GIF.
2. **`<noscript>` twins** double naive image counts.
3. **Nine images are dead hotlinks.** "Elevate Your Brand with Effective
   Packaging Design" embeds nine Facebook CDN images whose signed URLs expired
   in August 2024 (`oe=66AE…`). They 403, and are broken on designally.co today
   — verified by loading one from the site's own origin. The extractor drops any
   image not hosted on designally.co and reports the count. That post therefore
   renders as text only, which is what a reader sees on the original anyway.

## Content shape

| Post | Category | Text blocks | Images |
|---|---|---|---|
| Annual Brand Health Check | Tips | 10 | 0 |
| Designing E-Commerce Websites | Tips | 18 | 3 |
| Developing a Strong Brand Identity | Knowledge, Tips | 43 | 0 |
| Elevate Your Brand (Packaging) | Knowledge | 26 | 0 (9 dropped) |
| Exploring Brand Archetypes | Knowledge | 25 | 1 |
| The Art and Science of Naming | Tips | 20 | 3 |
| The Art of Consistent Branding | Knowledge | 20 | 2 |
| The Basic Fundamentals of Graphic Design | Tips | 27 | 4 |
| The Power of Online Brand Guidelines | Knowledge | 13 | 2 |

25 distinct images, 25MB. Dates cross-check against the existing post seed —
all nine match, including the Thai month names.
