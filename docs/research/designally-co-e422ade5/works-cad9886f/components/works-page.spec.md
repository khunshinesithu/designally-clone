# /works/ Page Specification

- **Route:** `src/app/works/page.tsx`
- **Page key:** `works-cad9886f` · **Site key:** `designally-co-e422ade5`
- **Document height at 1440:** 4092px
- **Raw extraction:** `extract-works-page.json` in this page's research dir (double-JSON-encoded)

## Container

Fixed **`max-width: 1200px`, centred** (content starts at x=113 in a 1425px viewport) — the same as
`/contact-us/` and `/thoughts/`, NOT the homepage's fluid 75%.

## Page structure

| # | Section | Live id | Height | Component |
|---|---|---|---|---|
| — | Floating header | `0931aa7` | overlay | `shared/FloatingHeader` (`activeNav="/works/"`) |
| — | Site header | `34607bb` | 131 | `shared/SiteHeader` (`activeNav="/works/"`) |
| 1 | Masthead | `aa96562` | 342 | `WorksMasthead` |
| 2 | Gallery (76 items) | `13a2e40` | 1258 | `WorksPageGallery` |
| 3 | Case Study (6 cards) | `d8038f9` | 1634 | `shared/CaseStudySection` with props |
| — | Orange CTA | `1caafeb` | 669 | `shared/CtaSection` |
| — | Footer | `ae4d07f` | 57 | `shared/SiteFooter` |

## 1. Masthead `aa96562`

Height 342. One row of three EB Garamond runs plus the decorative illustration.

- All three runs: EB Garamond **102px / 500**, baseline at y=212
  - `Explore` — `rgb(33, 33, 33)`, x=113
  - `our` — `rgb(33, 33, 33)`, x=447
  - `works` — **`rgb(245, 99, 65)`**, x=613
- Decorative SVG: the **same asset the homepage uses** —
  `/sites/designally-co-e422ade5/shared/svg/works-illustration.svg` (viewBox `0 0 349 239`) —
  but rendered **377 × 258** here (vs 349 × 239 on `/`), at x=893, y=162, so it again overlaps the
  text row upward by ~50px.

Note this masthead is **larger than the homepage's** version of the same heading (102px vs 72px)
and has no filter bar attached — the filters belong to the gallery section below.

## 2. Gallery `13a2e40`

Same Premium Addons widget as the homepage, but bigger tiles and more items.

- Section 1425 × 1258, flex column
- Grid container: **1200 × 900**, at x=113, y=539
- Tile: **300 × 300**, `padding: 8px`
- Image frame: **284 × 284**, `border-radius: 16px`, `overflow: hidden`
- **4 columns × 300px = 1200px.** Use CSS Grid (`repeat(4, 1fr)`), not isotope/absolute positioning.
- **76 items total, 12 visible on load** (3 rows × 4). Two items carry no image → **74 renderable**.
- "View More" button: identical to the homepage's — `padding: 16px 40px 16px 48px`,
  `border: 1px solid rgb(245, 99, 65)`, `border-radius: 200px`, Poppins 16px/500/19.2px,
  `rgb(245, 99, 65)`, 173 × 53, at y=1519. Reveal 12 more per click; hide it when the current
  filter is exhausted; reset to 12 when the filter changes.

### Filters — identical set to the homepage

| label | value | items |
|---|---|---|
| All projects | `null` (active on load, `rgb(245, 99, 65)`) | 76 |
| Logo Design | `logo-design` | 28 |
| Packaging | `packaging` | 16 |
| Brand CI | `brand-ci` | 16 |
| Website | `website` | 8 |
| Social Media | `social-media` | 22 |

Poppins **16px / 400**, inactive `rgb(33, 33, 33)`, active `rgb(245, 99, 65)`,
`padding: 0 12px`, `margin-bottom: 40px`, `transition: 0.3s ease-in-out`.
The `/` separators between labels are decorative non-interactive spans.
Category totals sum to 90 across 76 items — items can carry more than one category.

### Item data

The full 74-item constant is pre-generated and verified at
`docs/research/designally-co-e422ade5/works-cad9886f/components/work-items.snippet.txt`.
**Paste it verbatim.** Every `src` in it has been downloaded to
`public/sites/designally-co-e422ade5/works-cad9886f/images/`. Do not retype the list.

### Hover

Same as the homepage: image `transform: scale(1.1)` inside the 16px-radius frame,
`transition: 0.3s ease-in-out`.

## 3. Case Study `d8038f9` — reuse the shared component

`shared/CaseStudySection` is already prop-driven. Render it as:

```tsx
<CaseStudySection studies={WORKS_CASE_STUDIES} containerClassName="mx-auto w-full max-w-[1200px]" />
```

The card is fluid: its measured 588 × 410 here is just `(1200 − 24) / 2`, exactly as the homepage's
522.375px is `(1068.75 − 24) / 2`. **Do not hard-code a new card size** — pass the container and the
existing component produces the right width.

Grid: 2 columns, column gap 24px (x=113 / 725), row gap 56px (y=1864 / 2330 / 2796).

Define `WORKS_CASE_STUDIES` (six entries, `DsgCaseStudy[]`) in your page component:

| # | Title | Industry | Services | Image | href |
|---|---|---|---|---|---|
| 1 | Skytower | Industrial & Manufacturing | Branding / Website | `Skytower-1024x576.jpg` | `https://designally.co/works/skytower-rebranding-and-website-projects/` |
| 2 | Bitazza Thailand/Global | Financial Services | Design Support / Website | `Bitazza-1024x576.jpg` | `https://designally.co/works/bitazza-design-support-and-website/` |
| 3 | Laga | Consumers Products | Branding / Website | `LAGA-1024x576.jpg` | `https://designally.co/works/laga-branding-and-website-project/` |
| 4 | INN News | Corporate | Branding / Website | `INN-News-1024x576.jpg` | `https://designally.co/works/inn-news-rebranding-and-website-projects/` |
| 5 | Nourigo | Consumers Products | Branding | `Nourigo-1024x576.jpg` | `https://designally.co/works/nourigo-supplements-branding-project/` |
| 6 | Fatcoco | Bars & Restaurants | Website | `Fatcoco-1024x576.jpg` | `https://designally.co/works/fatcoco-fb-website-project/` |

`meta` is `"<Industry> / <Services>"`, matching the shared component's contract.

**Image paths:** the first four already exist at
`/sites/designally-co-e422ade5/root-8a5edab2/images/<file>` (reuse them — do not duplicate);
Nourigo and Fatcoco are new at `/sites/designally-co-e422ade5/works-cad9886f/images/<file>`.

All six hrefs stay **absolute** — individual project pages are not part of this clone.

Heading block above the grid is the same as the homepage's: `Case` + `Study` (Poppins 40px/500,
second word orange) on the left, `Unveiling` / `Success Stories` / `of our clients`
(Poppins 20px/500, middle run orange) on the right. The shared component already renders this.

## Metadata

- `<title>`: `Works | DESIGNALLY`

## Responsive

Only 1440 was measured. Scale sensibly and flag your choices:
- Masthead 102px → ~48px at ≤767px; the illustration hides below 768px (as on the homepage).
- Gallery: 4 columns → 3 at tablet → 2 at mobile, tiles staying square.

## Build notes
- `"use client"` for the gallery only (filter + load-more state). Keep the rest server components.
- Mirror `src/app/page.tsx` for route structure and the `dsg-site` wrapper.
- Verify `npx tsc --noEmit` and `npm run build` before finishing.
