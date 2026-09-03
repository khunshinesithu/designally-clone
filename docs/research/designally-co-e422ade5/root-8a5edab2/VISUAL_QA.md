# VISUAL_QA.md — designally.co (/) clone

Phase 5 results. The clone was measured against the live site section by section at
1440×900 and 390×844, and every discrepancy below was traced to a measurement or a
build error and fixed.

## Section heights — desktop (1440)

| Section | Live | Clone | Δ |
|---|---:|---:|---:|
| Header | 131 | 131 | 0 |
| Hero showcase | 804 | 784 | −20 |
| Intro | 723 | 723 | 0 |
| Our Services | 4121 | 4167 | +46 |
| Explore our works | 1536 | 1514 | −22 |
| Break the limits | 872 | 884 | +12 |
| Case Study | 1358 | 1358 | 0 |
| Orange CTA | 669 | 668 | −1 |
| Footer | 57 | 57 | 0 |
| **Document** | **10291** | **10305** | **+14 (0.14%)** |

No horizontal scroll at any width.

## Section heights — mobile (390)

| Section | Live | Clone | Δ |
|---|---:|---:|---:|
| Header | 24 | 51 | +27 |
| Hero showcase | 753 | 708 | −45 |
| Intro | 1146 | 1230 | +84 |
| Our Services | 4915 | 5102 | +187 |
| Explore our works | 1583 | 1356 | −227 |
| Break the limits | 392 | 508 | +116 |
| Case Study | 1579 | 1790 | +211 |
| Orange CTA | 443 | 548 | +105 |
| Footer | 87 | 136 | +49 |
| **Document** | **11049** | **11449** | **+400 (3.6%)** |

## Discrepancies found and fixed

1. **Services section 407px short.** The card column had no vertical padding
   (measured 99px top / 114px bottom) and each `ServiceCard` was missing the 24px
   inset above its eyebrow row and below its image, which is what makes the live
   cards 655px rather than 607px.

2. **Works section 252px tall.** The filter bar, grid and "View More" button were
   three separate flex children of an evenly spaced column, picking up ~120px gaps.
   On the live site they are nested in one `.premium-img-gallery` block: the grid
   sits flush under the filter bar and the button 80px below the grid.

3. **Floating header built at 375px wide.** That number came from a `getComputedStyle`
   reading taken while the element was still `visibility: hidden` and had not been
   laid out. Re-measured at scrollY 0 / 1100 / 1500 / 3000 / 5800 / 8000: it is
   full-width at every one, with the toggle at the right padding edge (x=1294).

4. **"View All Projects" button missing.** The live Case Study section has a 103px
   block below the grid holding a centred outline pill linking to `/works/`. The
   first extraction pass queried only `h1–h6`/`p`, so an `<a>`-only block was missed.
   Caught by the builder agent reporting that the section height did not reconcile.

5. **CTA wave arc too deep.** The live shape SVG is 2281.3px wide inside a 1425px
   wrapper — 160%, centred — which flattens the curve. Stretching it to 100% produced
   a pronounced dome. Restored the overscale and clipped it (the overscale had briefly
   introduced a horizontal scrollbar).

6. **"Click to Connect !" colour and family.** Measured white Poppins on the inner
   `.elementor-headline-dynamic-text` span. An earlier reading of the wrapper `<h1>`
   reported dark ink in the system stack, and I wrongly "corrected" the component to
   the system font before re-measuring the span that actually renders.

7. **Scribble drawn as a hard dark ellipse.** It belongs to Elementor's cycling
   animated-headline widget, is absent from the DOM in the steady state, and appears
   only as a soft light halo. Changed to a low-opacity white.

8. **Container widths assumed rather than measured.** The tablet/mobile steps were
   guessed at 88% / 90%; measured 87.6% / 83.8%. Corrected in `globals.css` and in the
   two components that reproduce the gutters by hand.

9. **Mobile-only sizing.** Hero video card is 327×549 with a 16px radius on mobile
   (not the desktop 1069/702 at 48px) and its headline is 28px; the works section has
   zero vertical padding and a 48px heading; the header collapses to a 24px bar.

## Behaviours verified in the running clone

| Behaviour | Expected | Observed |
|---|---|---|
| Floating header reveal | hidden < 1000px, visible ≥ 1000px | hidden at 900, visible at 1100 |
| Gallery initial tiles | 12 | 12 |
| Filter "Packaging" | 8 items | 8 |
| Filter reset to "All projects" | back to 12 | 12 |
| "View More" | +12 per click | 12 → 24 |
| Hero click-to-slide | move carousel, do not navigate | index 0 → 2, still on `/` |
| Hero active label | 600 weight, others 400 | Nourigo 600, others 400 |
| Service anchors | `#Branding`, `#Website`, `#DesignAlly` exist | all three present |

## Known gaps

- **Mobile is +3.6% overall.** No single gross error remains; the residual is spread
  thin across sections (intro +84, services +187, case study +211). Closing it would
  need a per-section mobile measurement pass, which was not run — only the three
  largest mobile deltas were measured and fixed.
- **Hero is 20px shorter than the live section.** The live container has a 20px flex
  gap to a zero-height element that only ever held an inline script. Reproducing an
  artifact gap was not worthwhile; it is the bulk of the remaining desktop delta.
- **Social brand icons are hand-drawn approximations.** The live site uses Font Awesome
  5 Brands glyphs; adding that dependency for five marks was not justified. The LINE
  mark in particular is a simplified speech bubble rather than the official logo.
- **Chaty chat widget not built.** A third-party WordPress plugin (fixed orange bubble,
  bottom right), explicitly out of scope.
- **Autoplay cannot be verified in headless Chromium.** The four hero videos load to
  `readyState 4` with no errors but stay paused until `play()` is called manually, which
  is a headless autoplay-policy restriction, not a defect — the elements carry `muted`
  and `playsInline` as required for real browsers.
- **Thai-language duplicate CTA/footer omitted** — `display: none` at every breakpoint
  on the live site (WPML alternate-language blocks).

---

# Multi-page extension — the remaining 5 routes

Added after the homepage, so the site navigation resolves inside the clone instead of leaving for
the live site. Same origin, one app root, one shared foundation.

## Document heights at 1440

| Route | Live | Clone | Δ |
|---|---:|---:|---:|
| `/` | 10291 | 10305 | +14 |
| `/works/` | 4092 | 4090 | −2 |
| `/contact-us/` | 3636 | 3627 | −9 |
| `/thoughts/` | 5086 | 5196 | +110 |
| `/services/` | 7477 | 7606 | +129 |
| `/about/` | 12108 wide | 12107 wide | −1 |

No horizontal overflow on any page at 1440 or 390. `npm run check` clean. All six routes prerender
static.

## Shared chrome

`SiteHeader`, `FloatingHeader`, `CtaSection`, `SiteFooter` and `CaseStudySection` were promoted to
the site-shared namespace once measurement confirmed they are the same across pages — the CTA and
footer are literally the same Elementor elements (`1caafeb`, `ae4d07f`) on five of the six pages.
Both headers gained an `activeNav` prop for the current-page orange state, and `CaseStudySection`
gained `studies`, `containerClassName`, `showViewAll` and `paddingClassName` so `/works/` can render
six cards with no View-All pill and no top padding.

The five nav paths are now relative. Links to pages genuinely not cloned — individual
`/works/<project>/` case studies, `/thoughts/<article>/`, the two `/thoughts/` category archives,
`/online-brand-guide/`, `/privacy-policy`, `/cookie-policy` — stay absolute so they resolve on the
live site rather than 404 here.

## Where my specs were wrong, and how it was caught

Builder agents were told to treat the raw extraction JSON as authoritative over the spec prose. That
caught real errors:

- **`/services/`** — 3 of the 4 DIVE/DEFINE/DESIGN/DELIVER body strings in the spec were wrong. I had
  reconstructed their tails from a 110-character preview. The builder used the JSON. It also found
  italicised letters inside every service title that the spec never mentioned.
- **`/about/`** — the spec was wrong or incomplete in a dozen places, all corrected against the live
  DOM: panels are `100vw` not 1440px; the track carries a −164px top margin; `design-highlight.svg`
  and `ally-highlight.svg` are not highlight strokes but the *words* "design" and "ally." drawn as
  artwork; the client names are Elementor hotspot tooltips, not white text on a dark panel (my spec
  told it to paint the panel dark — that would have been wrong); category headings are EB Garamond
  20px/600 with italicised letters, not Poppins 20px/500; "Hotels" is "Hospitality"; `Call Us` and
  `Contact Us` do not cycle.
- **`/contact-us/`** — the builder reported a QR code and six pieces of artwork my extraction had
  missed entirely. Recovered and patched in; the page went from 778px to 907px against a live 913px
  form section.
- **`/works/`** — the builder flagged that the shared `CaseStudySection` overshot by 264px rather
  than duplicating the component. Confirmed against the live page and fixed with two props.
- **Industry categories** — my leaf-node filter dropped all 15 category labels from the `/about/`
  extraction, leaving only the orange counts. Re-extracted and delivered mid-build.

## Known gaps

- **`/services/` +129px and `/thoughts/` +110px** (both under 2.2%). Spread across sections rather
  than one error; closing them needs a per-section pass that was not run.
- **Sub-1025px styling on `/about/`, `/services/`, `/thoughts/`, `/contact-us/` and `/works/` is
  unmeasured.** Only 1440 was measured for the five new pages; every breakpoint below that is the
  builders' judgement, documented in their reports.
- **`/about/` cycle interval (2500ms) and badge rotation (−10°) are invented** — neither was
  measurable from the DOM.
- **Contact form posts nowhere.** No backend is in scope. It validates client-side and shows an
  inline success state; the component says so in a comment.
- **Two phone/envelope icons on `/contact-us/` remain redrawn** — no inline SVG source exists for
  them on the live site.
- **Two live-site inconsistencies reproduced verbatim**, not corrected: `/about/` labels Consumer
  Products 25 while listing 26 names, and Real Estate 13 while listing 7.

---

# Mobile pass (390 x 844)

Measured against the live site at 390. Every original figure below was taken
with its lazy images force-loaded — see "Measuring the original" at the end,
which matters more than any single number here.

## Document heights

| Page | Original | Clone | Δ |
|---|---|---|---|
| Article | 6048 | 5991 | −0.9% |
| `/privacy-policy/` | 4669 | 4681 | +0.3% |
| `/thoughts/` | 5188 | 5288 | +1.9% |
| `/thoughts/tips/` | 3232 | 3318 | +2.7% |
| `/contact-us/` | 3877 | 3755 | −3.1% |
| `/` | 11011 | 11439 | +3.9% |
| Case study | 3945 | 4155 | +5.3% ¹ |
| `/works/` | 4083 | 4443 | +8.8% |
| `/services/` | ~7200 ² | 6160 | −14% |
| `/about/` | — | 10284 | not yet measured |

¹ Almost entirely the gallery: ours is 975 where the live one measures 781,
because the live container collapses and lets its images overflow. Excluding it
the page is +16.

² The raw reading is 7607, but three of the five card images never load, and an
unloaded placeholder box is square rather than the natural 342x214 — inflating
the section by ~384.

## What this pass changed

| Page | Before | After | Cause |
|---|---|---|---|
| `/contact-us/` | +51% | −3.1% | `basis-[466px]` on a column flex container sized the cross axis, stretching every 41px input to 466 |
| `/thoughts/` | +13% | +1.9% | Card title held 32/38.4 at mobile; the live one is 24/29 |
| `/thoughts/tips/` | +10% | +2.7% | Same component |
| Case study | +7.3% | +5.3% ¹ | Hero band is 506 not 420; Next up is 287 not 453 |
| `/services/` | −23% | −14% | Two missing features, below |

Two of these were missing content rather than responsive gaps, and were absent
at **every** width:

- The `/services/` panel had none of its four numbered rows (01 Branding,
  02 Website Design, 03 Design Support, 04 Digital Brand Book).
- The `/services/` cards carried prose lifted from the homepage cards. The live
  cards have 37 outlined tag pills across the five and no description at all.

## Deviations from the original, deliberately

The live site scrolls sideways at 390 on five page types — `/works/` reaches
578px of content in a 390px viewport, `/services/` and the case studies 560,
`/` 458, `/about/` 404. The case-study gallery is worse: its container collapses
to 7px while the images spill out of it.

None of that is reproduced. The clone has no horizontal overflow anywhere. That
is why heights on those pages stay a few percent apart — matching them would
mean shipping the bug.

## Measuring the original

Two traps, both of which produced wrong numbers before they were caught:

1. **Its lazy-loader never fires under viewport emulation.** `/works/` reads as
   3241px with all 80 images pending; force-loading `data-src` gives 4083-4251.
   Set `img.src = img.dataset.src` and wait for `complete` before measuring.
2. **The emulated viewport silently reverts.** A set of readings taken at
   1229px was very nearly recorded as mobile. Assert
   `document.documentElement.clientWidth` inside the measurement itself.

Two content notes: the `/thoughts/` listing paginates, showing six cards until a
scroll loads the rest, so a naive reading is 3728 rather than 5188. And an
unloaded image measures as a square placeholder — which is what produced a
briefly-believed "the cards are square-cropped on mobile".

## Still open

- `/services/` card column is ~900 short of the original.
- `/works/` +8.8% and `/` +3.9% are unexamined at this width.
- Case-study intro is +127.
- `/about/` has had no mobile pass; it is a horizontal scroller and needs its own.
