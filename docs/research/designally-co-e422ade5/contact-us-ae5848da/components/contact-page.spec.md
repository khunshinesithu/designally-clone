# /contact-us/ Page Specification

- **Route:** `src/app/contact-us/page.tsx`
- **Page key:** `contact-us-ae5848da` · **Site key:** `designally-co-e422ade5`
- **Document height at 1440:** 3636px
- **Raw extraction (exact leaf values):** `docs/research/designally-co-e422ade5/contact-us-ae5848da/extract-contact.json`

## Container — different from the homepage

This page does **not** use the homepage's fluid 75% container. Its inner is a fixed
**`max-width: 1200px`, centred**. Use a local wrapper, not `.dsg-container`.

## Page structure (top to bottom)

| # | Section | Live id | Height | Component |
|---|---|---|---|---|
| — | Floating header | `0931aa7` | overlay | `shared/FloatingHeader` (`activeNav="/contact-us/"`) |
| — | Site header | `34607bb` | 131 | `shared/SiteHeader` (`activeNav="/contact-us/"`) |
| 1 | Hero + contact details | `7fa1ce5` | 449 | `ContactHero` |
| 2 | "Don't be shy" band | `463aaa2` | 414 | `ContactHello` |
| 3 | Inquiry form | `e259632` | 913 | `ContactForm` |
| 4 | Google map | `5eae665` | 500 | `ContactMap` |
| 5 | Customer support | `d1348f0` | 501 | `ContactSupport` |
| — | Orange CTA | `1caafeb` | 669 | `shared/CtaSection` |
| — | Footer | `ae4d07f` | 57 | `shared/SiteFooter` |

Build sections 1–5 in a single `ContactPage` component file; they are simple enough not to warrant
five files, and none is reused elsewhere.

## 1. Hero `7fa1ce5`

- Section: 1425 × 449, flex column
- Inner: **max-width 1200px**, `padding: 80px 0 120px`
- Headline row: flex row, **gap 16px**, `padding-bottom: 60px`, height 124
  - `Have a project in Mind?` — EB Garamond **64px / 500 / lh 64px**, `rgb(33, 33, 33)`
  - `Let’s talk.` — EB Garamond **64px / 600 / lh 64px**, **`rgb(245, 99, 65)`** (note curly apostrophe)
- Contact row: flex row, `justify-content: space-between; align-items: center`, height 125
  Three groups, each `flex column; align-items: flex-start; gap: 8px`:

  | Label (Poppins 18px / 400 / lh 23.4px, `rgb(114, 120, 164)`) | Value (Poppins 28px / 500, `rgb(33, 33, 33)`) | href |
  |---|---|---|
  | `TALK WITH US` | `+66 65 005 5993` | `tel:0650055993` |
  | `DROP US A LINE` | `clients@designally.co` | `mailto:clients@designally.co` |
  | `ADD LINE` | `@designally` | `https://line.me/ti/p/%40designally` |

  Each value is preceded by a small icon box (28 × 34) with an 8px gap.

## 2. "Don't be shy" band `463aaa2`

- Height 414, `padding: 0 10px`, inner `padding: 10px 0`, transparent background
- Text: `Don’t be shy,` / `say hello!` (two lines)
  - font-family **Caveat** (`--font-hand`), **40px / 700**, `rgb(255, 255, 255)`
- Carries one decorative SVG, viewBox `0 0 80 124`, rendered **90 × 140**
- White text on a transparent section means it sits over a dark/painted backdrop — check the
  raw extraction for the parent's background before finalising; if none is found, the band reads as
  white-on-orange and should use the brand orange.

## 3. Inquiry form `e259632`

Height 913. Heading, then a "mad-libs" sentence form.

- Heading, two lines, EB Garamond **64px / 500**:
  - `Which services are you` — `rgb(33, 33, 33)`
  - `interested in?` — `rgb(51, 51, 51)`
- Sentence text runs: Poppins **32px / 400**, `rgb(33, 33, 33)`

**Field order and exact copy:**

1. Checkbox group `Interested in` — six options, inline:
   `Brand Identity`, `Website Design + Dev`, `Brand Guideline`, `Brand Strategy`, `Design Support`, `Other`
2. `My name’s` + text input — placeholder `Enter your name`, **required**
3. `from` + text input — placeholder `Enter your company name`, **required**
4. `I’d like to discuss about` + text input — placeholder `Briefly describe your project or idea.`, **required**
5. `Feel free to contact me at` + email input — placeholder `Enter your email`, **required**
6. `or` + tel input — placeholder `Enter your phone no.`, optional
7. Acceptance checkbox, **required**:
   `I agree to the DESIGNALLY agreement and customer Privacy Policy` /
   `I also agree to be contacted…` (full string is in the extraction JSON)
8. Submit button `Send inquiry`:
   - Poppins **40px / 400**, `rgb(255, 255, 255)`
   - background **`rgb(33, 33, 33)`**
   - `padding: 0 24px`, `border-radius: 500px`
   - 343 × 60

**The live page renders this form three times** (desktop / tablet / mobile Elementor variants),
which is why the DOM shows 48 inputs. **Build ONE form** with the 16 real fields and make it
responsive.

### Submission behaviour — important

There is **no backend in this clone**. Wire the form as a controlled React form that validates
client-side (required fields, email format) and, on submit, shows an inline success state.
**Do not post anywhere** — no endpoint, no email, no third-party service. Add a short comment in the
component saying so, so nobody later assumes it delivers.

## 4. Google map `5eae665`

- Height 500, iframe full width (1425 at desktop) × 500
- `src="https://maps.google.com/maps?q=Designally&t=m&z=15&output=embed&iwloc=near"`
- Reproduce as the same iframe (it needs no API key). Add `loading="lazy"`,
  `referrerPolicy="no-referrer-when-downgrade"` and a `title`.

## 5. Customer support `d1348f0`

- Height 501
- Heading, two lines, Poppins **40px / 500**, `rgb(33, 33, 33)`:
  `If you need some help` / `contact our customer support`
- Paragraph, Poppins **16px / 400**, `rgb(33, 33, 33)`:
  `For website support or assistance with existing projects, please submit a ticket. This will…`
  (full string in the extraction JSON)
- Link `Send us a ticket` — Poppins **16px / 500**, `rgb(245, 99, 65)` →
  `https://forms.clickup.com/3819042/f/3mhh2-27922/WC7V6SY2IUXE41Y9AF`
  (external, stays absolute; `target="_blank"` + `rel="noopener noreferrer"`)

## Metadata

- `<title>`: `Contact us | DESIGNALLY`

## Responsive

Only desktop (1440) was measured for this page. Scale sensibly:
- Headline 64px → ~40px at ≤767px; sentence text 32px → ~22px; submit button 40px → ~24px.
- Hero contact row: three columns at ≥1025px, stacking to a column below 768px.
- Map iframe stays full-bleed at every width; reduce its height to ~320px on mobile.
Flag anything you have to invent — it was not measured.

## Build notes
- `"use client"` is required for the form only; keep the rest server-rendered if you split it out.
- Import `SiteHeader`, `FloatingHeader`, `CtaSection`, `SiteFooter` from
  `@/components/sites/designally-co-e422ade5/shared/…` and pass `activeNav="/contact-us/"` to both headers.
- Fonts available as Tailwind tokens: `font-sans` (Poppins), `font-serif` (EB Garamond),
  and `font-[family-name:var(--font-hand)]` for Caveat.
- Verify `npx tsc --noEmit` passes before finishing.
