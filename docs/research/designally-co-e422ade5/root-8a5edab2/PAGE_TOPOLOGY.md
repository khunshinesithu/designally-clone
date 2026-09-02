# PAGE_TOPOLOGY.md — designally.co (/)

Assembly blueprint. Visual order, top to bottom, measured at 1440×900.

## Page-level layout

- Scroll container: the document. No custom scroll wrapper, no scroll-snap.
- `html { scroll-behavior: smooth }` — native smooth scroll for the in-page anchors.
- Content column: sections are 1425px wide at a 1440px viewport (≈15px scrollbar);
  inner boxed content is centered. The Services and CTA sections bleed full-width.
- Z-index layers: header-2 (fixed) `999` → header-1 (relative) `999` → everything else `0`/auto.
- Fixed/sticky overlays: header-2 (fixed, whole page), services left panel (sticky, within its section).

## Section order

| # | Working name | Elementor id | Top | Height | Interaction model | Component |
|---|---|---|---|---|---|---|
| 0 | Floating header (fixed overlay) | `0722474` | fixed | 147 | **scroll-driven** (reveals at 1000px) | `FloatingHeader` |
| 1 | Main header | `12a5b5d` | 1 | 131 | static | `SiteHeader` |
| 2 | Spacer | `e4c35ae` | 132 | 20 | static | inline in page |
| 3 | Hero video showcase | `c3b73fa` | 152 | 804 | **time-driven** carousel | `HeroShowcase` |
| 4 | Creative partner intro | `7f149c2` | 956 | 723 | static | `IntroSection` |
| 5 | Our Services | `bd5220f` | 1679 | 4121 | **scroll-driven** sticky panel | `ServicesSection` + `ServiceCard` |
| 6 | Explore our works | `36d3a17` | 5799 | 1536 | **click-driven** filter + load more | `WorksGallery` |
| 7 | Break the limits | `9522506` | 7335 | 872 | static (motion fx is a no-op) | `BreakLimitsSection` |
| 8 | Case Study | `615fd02` | 8207 | 1358 | static + hover | `CaseStudySection` + `CaseStudyCard` |
| 9 | Orange CTA | `1caafeb` | 9565 | 669 | static | `CtaSection` |
| 10 | Footer bar | `ae4d07f` | 10234 | 57 | static | `SiteFooter` |

Total document height 10291px.

## Dependencies

- `FloatingHeader` overlays every section; it must be rendered once at page level, outside
  the normal flow, not inside any section.
- `ServicesSection` owns the sticky context: the sticky panel is `position: sticky` relative to
  the section, so the panel and the card column must be siblings inside one positioned parent.
  Splitting them across components would break the sticky.
- `ServiceCard` × 5 is a child of `ServicesSection`.
- `CaseStudyCard` × 4 is a child of `CaseStudySection`.
- `WorksGallery` owns its own filter + load-more state; self-contained.
- Anchor targets `#Branding`, `#Website`, `#DesignAlly` are consumed by the services panel
  links and must exist as ids on the corresponding service cards.

## Excluded from the build

- Thai-language duplicate CTA/footer (`675a05b`, `8a56888`) — `display: none` at all breakpoints.
- Chaty third-party chat widget (fixed bottom-right orange bubble) — third-party plugin.
- Elementor sticky spacer duplicate nodes — implementation artifacts, not real elements.
