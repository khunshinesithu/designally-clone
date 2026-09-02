# Output Plan — designally.co, remaining 5 pages

Extends the existing `/` clone so the site navigation resolves inside the clone instead of
leaving for the live site. Same origin throughout, so one app root and one shared foundation.

`<app-root>`: repository root · `<site-key>`: `designally-co-e422ade5`

## Targets

| Source URL | `<page-key>` | Route | Doc size @1440 | Content |
|---|---|---|---|---|
| `/services/` | `services-eeda784a` | `src/app/services/page.tsx` | 7477px | hero video, Our Services (4789px), DIVE process |
| `/works/` | `works-cad9886f` | `src/app/works/page.tsx` | 4092px | heading, 76-item gallery, 6 case-study cards |
| `/about/` | `about-4f10f17b` | `src/app/about/page.tsx` | **12108px wide** × 961px | horizontal scroller, 49 images |
| `/thoughts/` | `thoughts-e2a689e8` | `src/app/thoughts/page.tsx` | 5086px | filter tabs, 9 post cards |
| `/contact-us/` | `contact-us-ae5848da` | `src/app/contact-us/page.tsx` | 3636px | 3 forms (48 inputs), Google Map embed |

Page keys are `<pathname slug>-<sha256(pathname)[0:8]>`. No collisions with `root-8a5edab2` or
with each other; none of these routes exists yet, so nothing is being replaced.

Per-page roots follow the established pattern:
- `docs/research/designally-co-e422ade5/<page-key>/`
- `docs/design-references/designally-co-e422ade5/<page-key>/`
- `src/components/sites/designally-co-e422ade5/<page-key>/`
- `public/sites/designally-co-e422ade5/<page-key>/`
- `scripts/download-assets-designally-co-e422ade5-<page-key>.mjs`

## Shared chrome — promoted, not duplicated

Measured across all six pages, these are the same Elementor template parts:

| Component | Evidence |
|---|---|
| `CtaSection` | element `1caafeb` on `/`, `/services/`, `/works/`, `/thoughts/`, `/contact-us/` — identical id, 669px |
| `SiteFooter` | element `ae4d07f` on the same five — identical id, 57px |
| `SiteHeader` | ids differ per template (`12a5b5d`, `56fa1bc`, `34607bb`) but render identically: 131px tall, `margin-top: -146px`, 536×50 logo at 214×20 orange, same 4 nav links, same CONTACT US pill (`12px 32px`, radius 200px) |
| `FloatingHeader` | ids differ (`0722474`, `243d1dc`, `0931aa7`) but identical: 1425×147, `padding: 40px 80px`, `sticky_effects_offset: 1000` |

**Action:** move these four from `root-8a5edab2/` to `designally-co-e422ade5/shared/` and import
them from every page. `CaseStudyCard` is also shared — `/works/` reuses the same `3db6188` card
element with 6 entries where `/` has 4.

`/about/` is the exception: it has **no CTA and no footer**.

## Two changes the shared chrome needs

1. **Active nav state.** The current page's nav item carries `elementor-item-active` and renders
   `rgb(245, 99, 65)` instead of `rgb(33, 33, 33)`. The homepage never showed this because `/` is
   not in the nav. Both headers need an `activeNav` prop.
2. **Internal links become relative.** Every `https://designally.co/<path>` that now has a local
   route is rewritten to `/<path>` so navigation stays inside the clone. Links to pages still not
   cloned (individual `/works/<project>/` case studies, `/online-brand-guide/…`) stay absolute and
   are listed as known external exits.

## Interaction models found in recon

- `/services/` — hero background video; "Our Services" is a 4789px block; a "DIVE" process section.
- `/works/` — the same click-driven Premium Addons gallery as `/`, but **76 items** rather than 58.
- `/about/` — **horizontal scroll**, desktop only. The live mechanism is exactly:
  ```js
  if (window.innerWidth > 1025) {
    const scrollContainer = document.querySelector("main");
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }
  ```
  `<main>` is `display: flex; flex-direction: row; overflow-x: auto`, scrollWidth 12108px.
  Below 1025px it falls back to normal vertical scrolling. A "Scroll to Navigate" badge sits
  bottom-right.
- `/thoughts/` — blog listing with All / Knowledge / Tips filter tabs and 9 post cards. Dates render
  in Thai (WPML), e.g. `กรกฎาคม 17, 2024`.
- `/contact-us/` — 3 forms / 48 inputs plus a Google Maps iframe.

## Scope decision on the contact forms

The clone has no backend (out of scope per the skill's defaults). The forms will be built to match
visually and to validate client-side, but **will not submit anywhere** — no endpoint, no email. The
Google Maps embed is reproduced as the same iframe, which works without a key.

## Build order

1. Promote shared chrome + add `activeNav` + relativise internal links (touches `/`, so sequential).
2. Then per page, in ascending complexity: `/contact-us/`, `/thoughts/`, `/works/`, `/services/`,
   `/about/` — extract → spec → dispatch builder in a worktree → merge → verify build.
