# BEHAVIORS.md — designally.co (/)

Behavior bible from the mandatory interaction sweep. Every value below is from
`getComputedStyle()` or the element's Elementor `data-settings` on the live site at
1440×900 unless stated otherwise. Reference this when writing every component spec.

## Global

| Item | Finding |
|---|---|
| Smooth scroll library | **None.** No Lenis, no Locomotive. The page uses native CSS `html { scroll-behavior: smooth }`. Reproduce with CSS only — do not add a scroll library. |
| Scroll snap | None on any container. |
| Page scroll container | The document itself. No custom scroll wrapper. |
| Global keyframes | None used by the visible sections. |
| Third-party overlay | A "Chaty" chat widget (orange circular button + "Contact us" label, fixed bottom-right). Third-party plugin, **out of scope** — do not build. |
| Document height | 10291–10441px at 1440 wide (varies as images settle), 11049px at 390, 11849px at 768. |

## 1. Header — two-header swap (scroll-driven)

Two separate headers exist. This is the single most important page behavior.

**Header-1 `12a5b5d`** — the full header, in normal flow.
- `position: relative; z-index: 999; margin-top: -146px; height: 131.203px; width: 1425px`
- `transition: background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.4s`
- Contains: DESIGNALLY wordmark logo (267×51), nav SERVICES / WORKS / ABOUT / THOUGHTS (534×51), CONTACT US pill button (169×45).
- Behavior: **none.** It simply scrolls out of view with the page. It is not sticky.

**Header-2 `0722474`** — a compact floating header, `position: fixed`.
- Constant: `position: fixed; top: 0; left: 0; width: 375px; height: 147px; padding: 40px 80px; background: rgba(255,255,255,0); z-index: 999; transition: 0.3s`
- Contains only: circular orange **D monogram** (52×52) at x=80,y=40, and a circular outlined **hamburger button** (52×52) at x=241,y=40. Background transparent — it floats over whatever is beneath.
- **Trigger:** scroll position **1000px** (Elementor `sticky_effects_offset: 1000`). Class `elementor-sticky--effects` is added/removed at that threshold.
- **State A — scrollY < 1000:** `transform: translateY(-134px); opacity: 0; visibility: hidden`
- **State B — scrollY ≥ 1000:** `transform: translateY(0); opacity: 1; visibility: visible`
- **Transition:** `0.3s` on all properties.
- Active on desktop, tablet and mobile.

Implementation approach: a scroll listener (or IntersectionObserver on a 1000px sentinel)
toggling a boolean; drive `transform`/`opacity`/`visibility` with a CSS transition.

## 2. Hero video showcase — time-driven carousel

- 6 `<video>` elements, **4 unique sources** (2 are Elementor loop clones):
  `Intro-LAGA.mp4`, `INTRO-Bitazza.mp4`, `Intro-LOGO-INN-News.mp4`, `Intro-VDO-NouriGo.mp4`
- All 1920×1080, `autoplay`, `loop`, `muted`.
- Rendered in a large rounded container with the client label row beneath:
  `Bitazza / INN News / Nourigo / Laga` — the label matching the visible video renders **bold**,
  the others normal weight. So the label row is synced to the active slide.
- **Interaction model: time-driven** (auto-advancing carousel), not click-driven.

## 3. Intro / "creative partner" section `7f149c2`

- Static. Left column: DESIGNALLY eyebrow, headline with orange-highlighted words
  (`brands`, `websites`, `creative assets`), paragraph, orange pill "Explore More" button.
- Right column: `Cog_Designally.svg` line illustration (382×249 natural).
- No scroll or click behavior. Button hover state to be captured in its spec.

## 4. Our Services `bd5220f` — sticky panel + scrolling cards (scroll-driven)

**INTERACTION MODEL: sticky left panel, right column scrolls past it. Not tabs, not clicks.**

- Two columns inside a 4121px-tall section.
- **Left `0f7b25a`** — orange panel, Elementor sticky:
  `data-settings: {"sticky":"top","sticky_parent":"yes","sticky_on":["desktop"],"sticky_offset":0}`
  → equivalent to `position: sticky; top: 0` scoped to the parent. **Desktop only.**
  `background: rgb(245,99,65); border-radius: 0 80px 80px 0; padding: 114px 0 0; width: 712.5px`
  Content block is 740px tall.
  Elementor renders a duplicate spacer node for sticky — that is an implementation artifact,
  not two panels. Build one sticky panel.
- **Right `c6e64e8`** (4121px) → inner `d3e3043` (3907px) holds **5 service cards**, in order:
  | id | eyebrow | title | height |
  |---|---|---|---|
  | `e0259ac` | BRANDING | Brand Core | 655 |
  | `8784e54` | BRANDING | Brand Visuals | 631 |
  | `2217146` | BRANDING | Brand Execution | 631 |
  | `062cf37` | WEBSITE | Website + Dev | 697 |
  | `4df91be` | Your Design Ally | Design Support | 655 |
- Left panel numbered list is **click-to-anchor**, NOT scroll-synced highlighting.
  There is no active-state change as you scroll. Hrefs:
  `01 Branding → #Branding`, `02 Website Development → #Website`,
  `03 Design Support → #DesignAlly`,
  `04 Online Brand Guide → https://designally.co/online-brand-guide/designally/` (external),
  plus a `Start Your Project with Designally` button → `/contact-us/`.
  Note there are 4 nav items but 5 cards — the three BRANDING cards share anchor `#Branding`.
- Because sticky is desktop-only, on tablet/mobile the panel is a normal block that scrolls
  above the cards.

## 5. Explore our works `36d3a17` — click-driven filter gallery + load more

**INTERACTION MODEL: click-driven.** Premium Addons "premium-img-gallery", isotope `fitRows`, hover effect `zoomin`.

- **Filter bar** `.premium-img-gallery-filter` with `.category` buttons carrying `data-filter`:
  | label | data-filter | item count |
  |---|---|---|
  | All projects | `*` | 58 |
  | Logo Design | `.logo-design` | 16 |
  | Packaging | `.packaging` | 8 |
  | Brand CI | `.brand-ci` | 16 |
  | Website | `.website` | 8 |
  | Social Media | `.social-media` | 22 |
  The `/` separators between labels are also `.category` nodes with a junk `data-filter` —
  they are decorative separators, not filters. Build them as plain text separators.
  `All projects` carries class `active` on load.
- **Grid:** `.premium-gallery-container`, `position: relative`, items `position: absolute`
  (isotope layout), each item **274×274 with 8px padding**, container width 1097.25px
  → **4 columns**. Initial container height 831.578px → 3 rows.
- **58 items total, 12 visible on load** (47 carry `premium-gallery-item-hidden`; 12 shown).
  A `<button class="premium-gallery-load-more-btn">View More</button>` reveals more.
- 8 items belong to 2 categories; category totals sum to 70 across 58 items.
- 2 of the 58 items have no `<img>`.
- Each item wraps `a.pa-gallery-whole-link` pointing at the full-size upload (lightbox link).

## 6. Break the limits `9522506` — motion effect is a NO-OP

- Carries `elementor-motion-effects-element` with
  `motion_fx_translateY_effect: yes` but `motion_fx_translateY_speed.size: 0`.
- **Measured `transform` at scrollY 0 / 600 / 1500 / 7600: `matrix(1,0,0,1,0,0)` in every case.**
  There is no visible parallax. Do **not** implement a parallax effect.
- Static element: `padding: 160px 0; height: 872px`.
- `transition: transform 1s cubic-bezier(0, 0.33, 0.07, 1.03), opacity 1s cubic-bezier(0, 0.33, 0.07, 1.03)` is present but never triggered.

## 7. Case Study `615fd02`

- Heading block + a **2×2 grid** of 4 linked cards `3db6188` (each ~373px tall at 1440;
  measured 602px in an earlier pass before images settled — trust the post-load 373px).
- Cards, each an `<a>`:
  | client | meta |
  |---|---|
  | Skytower | Industrial & Manufacturing / Branding / Website |
  | Bitazza | Thailand/Global Financial Services / Design Support / Website |
  | Laga | Consumers Products / Branding / Website |
  | INN News | Corporate / Branding / Website |
- Images: `Skytower-1024x576.jpg`, `Bitazza-1024x576.jpg`, `LAGA-1024x576.jpg`, `INN-News-1024x576.jpg`.
- Hover states to be captured per-card in its spec.

## 8. Orange CTA `1caafeb` + footer bar `ae4d07f`

- CTA: `background: rgb(245,99,65)`, 669px tall, white text
  "Open a new perspective for your brand." / "Let's work together." / "Click to Connect !", 2 inline SVGs.
- Footer bar: same orange, 57px tall — "© 2023 Designally Co., Ltd. All Rights Reserved" and
  "PRIVACY POLICY / TERMS OF SERVICES".
- A duplicate Thai-language CTA/footer pair exists in the DOM
  (`675a05b`, `8a56888`) carrying `elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile`
  → `display: none` at every breakpoint (WPML alternate-language blocks). **Do not build them.**

## Responsive sweep

| Viewport | Document height | Notes |
|---|---|---|
| 1440 (desktop) | 10291–10441px | Services panel sticky; full header-1 with inline nav. |
| 768 (tablet) | 11849px | Services sticky **off** (`sticky_on: ["desktop"]`). Header-1 nav `feffdf7` is `elementor-hidden-tablet`. |
| 390 (mobile) | 11049px | Hamburger `MENU` items (`627495b`, `ccf34bf`) become visible — they are `elementor-hidden-desktop elementor-hidden-tablet`. Header-1 CONTACT US button `a02bdd0` is `elementor-hidden-mobile`. |

Breakpoint note: Elementor's default breakpoints apply — tablet ≤1024px, mobile ≤767px.
Per-section responsive values must still be measured individually in each component spec.
