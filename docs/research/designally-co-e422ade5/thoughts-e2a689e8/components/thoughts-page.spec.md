# /thoughts/ Page Specification

- **Route:** `src/app/thoughts/page.tsx`
- **Page key:** `thoughts-e2a689e8` · **Site key:** `designally-co-e422ade5`
- **Document height at 1440:** 5086px
- **Raw extraction:** `extract-thoughts.json` and `extract-thoughts-2.json` in this page's research dir
  (both double-JSON-encoded: `JSON.parse(JSON.parse(contents))`)

## Container

Fixed **`max-width: 1200px`, centred** — the same as `/contact-us/`, NOT the homepage's fluid 75%.
Content sits at x=113 in a 1425px viewport.

## Page structure

| # | Section | Live id | Height | Component |
|---|---|---|---|---|
| — | Floating header | `0931aa7` | overlay | `shared/FloatingHeader` (`activeNav="/thoughts/"`) |
| — | Site header | `34607bb` | 131 | `shared/SiteHeader` (`activeNav="/thoughts/"`) |
| 1 | Masthead + category tabs | `fd79586` | 368 | `ThoughtsMasthead` |
| 2 | Post listing (9 cards) | `5d0e1c1` | 3646 | `ThoughtsListing` + `ThoughtCard` |
| — | Orange CTA | `1caafeb` | 669 | `shared/CtaSection` |
| — | Footer | `ae4d07f` | 57 | `shared/SiteFooter` |

## 1. Masthead `fd79586`

Height 368. Two things on one row: a stylised wordmark on the left, category tabs on the right.

### Wordmark — three separate runs, one of them white

All EB Garamond **102px / 500 / lh 102px**, sitting on one baseline starting at x=113, y=212:

| run | text | colour | width |
|---|---|---|---|
| 1 | `T` | `rgb(33, 33, 33)` | 69.27px |
| 2 | `h` | **`rgb(255, 255, 255)`** | 54.16px |
| 3 | `oughts` | `rgb(33, 33, 33)` | 275px |

The white `h` is deliberate — on a white page it reads as a gap in the word, the same trick as the
italic `I` in "OUR SERV*I*CES". Render it as three spans in one heading; do not "fix" it to dark.

### Category tabs — links, not client-side filters

EB Garamond **64px / 500 / lh 64px**, on one row starting at x=753, y=243:

| label | colour | href |
|---|---|---|
| `All` | **`rgb(245, 99, 65)`** (active — this is the `/thoughts/` page itself) | `/thoughts/` |
| `Knowledge` | `rgb(33, 33, 33)` | `https://designally.co/thoughts/knowledge/` |
| `Tips` | `rgb(33, 33, 33)` | `https://designally.co/thoughts/tips/` |

**These navigate to WordPress category archives.** They are not in-page filters — do not build filter
state. The two category archives are not part of this clone, so those two hrefs stay **absolute** to
the live site; `All` is this page, so it is relative.

## 2. Post listing `5d0e1c1`

Height 3646. Nine cards stacked vertically.

### Card layout

- Card: **1200 × variable**, `display: flex; flex-direction: row; gap: 80px`
- Left column: **560px** wide — title, meta, "Read more"
- Right column: **560px** wide — thumbnail
- Card heights vary with title length: 330, 400, 293, 233, 345, 345, 345, 370, 370

### Left column

- **Title** `<h1>`: Poppins **32px / 500 / lh 38.4px**, `rgb(33, 33, 33)`, width 560px
- **Meta row**, ~139px below the title top:
  - Categories: Poppins **18px / 500 / lh 23.4px**, `rgb(33, 33, 33)`
  - Date: Poppins **18px / 400 / lh 23.4px**, `rgb(33, 33, 33)`, offset x≈229 (i.e. after the categories)
  - **Dates render in Thai** (WPML) — reproduce them verbatim, e.g. `กรกฎาคม 17, 2024`. Do not
    translate or reformat them.
- **"Read more"**: Poppins **20px / 500 / lh 26px**, **`rgb(245, 99, 65)`**, `margin: 8px 0 16px`,
  followed inline by a 24×24 ↗ arrow with `margin-bottom: -5px`.
  Use **`ArrowUpRightIcon` from `../shared/icons`** — the live `up_right_arrow.svg` is byte-identical
  to it, so no new asset is needed. It renders in the same orange as the text.

### Right column — thumbnail

- Box **560 × (card height)**, `border-radius: 8px`, image `object-fit: fill`
- All nine are already downloaded to
  `public/sites/designally-co-e422ade5/thoughts-e2a689e8/images/`

### The nine posts, in order

| # | Title | Categories | Date | Thumbnail file |
|---|---|---|---|---|
| 1 | Elevate Your Brand with Effective Packaging Design: Insights and Best Practices | Knowledge | กรกฎาคม 17, 2024 | `Albotroos-packaging-design-by-Designally-design-agency-bangkok-2-1536x904.jpg` |
| 2 | Developing a Strong Brand Identity | Knowledge, Tips, Uncategorized @th | มิถุนายน 10, 2024 | `strong_brand_identity_cover-1536x1097.jpg` |
| 3 | Annual Brand Health Check: Preparing for Success in 2024 | Tips | พฤศจิกายน 14, 2023 | `Content_1_Shared-Image-1536x804.webp` |
| 4 | The Art and Science of Naming: Crafting a Brand Identity Through Words | Tips | สิงหาคม 23, 2023 | `5.0-1536x946.png` |
| 5 | Exploring Brand Archetypes: Unveiling the Personality Behind Your Brand | Knowledge | สิงหาคม 23, 2023 | `4.0-1536x946.png` |
| 6 | Designing E-Commerce Websites: Strategies for Driving Sales | Tips | สิงหาคม 23, 2023 | `3-1536x946.png` |
| 7 | The Basic Fundamentals of Graphic Design | Tips | สิงหาคม 23, 2023 | `The-Basic-Fundamentals-of-Graphic-Design_feature-1536x946.jpg` |
| 8 | The Art of Consistent Branding: A Comprehensive Guide | Knowledge | กรกฎาคม 11, 2023 | `Frame-942-1536x1015.png` |
| 9 | The Power of Online Brand Guidelines: Streamlining Your Brand Identity | Knowledge | กรกฎาคม 11, 2023 | `Frame-9421-1536x1015.png` |

Post hrefs (all **absolute** — individual articles are not part of this clone, so linking to the live
site is correct; they would otherwise 404):

1. `https://designally.co/elevate-your-brand-with-effective-packaging-design-insights-and-best-practices/`
2. `https://designally.co/developing-a-strong-brand-identity/`
3. `https://designally.co/annual-brand-health-check-preparing-for-success-in-2024/`
4. `https://designally.co/the-art-and-science-of-naming-crafting-a-brand-identity-through-words/`
5. `https://designally.co/exploring-brand-archetypes-unveiling-the-personality-behind-your-brand/`
6. `https://designally.co/designing-e-commerce-websites-strategies-for-driving-sales/`
7. `https://designally.co/the-basic-fundamentals-of-graphic-design/`
8. `https://designally.co/the-art-of-consistent-branding-a-comprehensive-guide/`
9. `https://designally.co/the-power-of-online-brand-guidelines-streamlining-your-brand-identity/`

## States & behaviours

- **No client-side interactivity.** The tabs navigate; the cards link. No filtering, no load-more,
  no scroll effects were found on this page.
- Hover: "Read more" and the title should darken/shift to orange consistently with the rest of the
  site (`transition: 0.3s`). The exact rule was not isolated — keep it restrained and say so.

## Metadata

- `<title>`: `Thoughts | DESIGNALLY`

## Responsive

Only 1440 was measured. Scale sensibly and flag your choices:
- Wordmark 102px → ~56px at ≤767px; tabs 64px → ~32px and wrap under the wordmark.
- Cards go from a 2-column row (560 + 80 gap + 560) to a stacked column below 768px, thumbnail first
  or last — pick one and say which.

## Build notes
- Server components throughout — there is no interactivity on this page.
- Import the four shared chrome components from
  `@/components/sites/designally-co-e422ade5/shared/…` and pass `activeNav="/thoughts/"`.
- Mirror `src/app/page.tsx` for the route structure and `dsg-site` wrapper.
- Verify `npx tsc --noEmit` and `npm run build` before finishing.
