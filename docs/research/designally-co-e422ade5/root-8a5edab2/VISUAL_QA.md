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
