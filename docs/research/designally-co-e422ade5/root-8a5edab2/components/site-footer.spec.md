# SiteFooter Specification

## Overview
- **Target file:** `src/components/sites/designally-co-e422ade5/root-8a5edab2/SiteFooter.tsx`
- **Screenshot:** `docs/design-references/designally-co-e422ade5/root-8a5edab2/section-09-footer.png`
- **Interaction model:** static (link hover only).
- Source element: `.elementor-element-ae4d07f`

A single thin orange bar closing the page. It shares the CTA section's orange, so the two read as one
continuous block.

## DOM Structure
```
<footer>                       background #F56341, height 57px
  └ <div class="dsg-container">   padding 16px 0, flex row, justify-content space-between
      ├ copyright text
      └ legal links            PRIVACY POLICY / TERMS OF SERVICES
```

## Computed Styles (exact values from getComputedStyle at 1440×900)

### Root `<footer>`
- **background-color: rgb(245, 99, 65)**
- width: 1425px (100%); height: **57px**
- display: flex; flex-direction: column; position: relative
- The live element carries `margin-bottom: -30px`. That pulls the bar into the page's trailing
  whitespace on the WordPress build. **Do not reproduce it** — in this clone the footer is the last
  element, so a negative bottom margin would only create a scroll artifact. Use `margin: 0`.

### Container
- **padding: 16px 0**
- width: 1068.75px (`max-width: 75%`), margin-inline auto
- height: 56px
- display: flex; flex-direction: **row**; **justify-content: space-between**

### Copyright (left)
- text: `© 2023 Designally Co., Ltd. All Rights Reserved`
- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- color: **rgb(255, 255, 255)**
- width: 359.906px; height: 24px
- text-align: center (within its own box; it sits flush left in the row)
- Plain text — **not** a link.

### Legal links (right)
Three spans on one line, right-aligned (`text-align: end`), each 24px tall:
| text | element | href | width |
|---|---|---|---|
| `PRIVACY POLICY` | `<a>` | `/privacy-policy` | 124.883px |
| `/` | plain span, not a link | — | 7.617px |
| `TERMS OF SERVICES` | `<a>` | `/cookie-policy` | 150.977px |

- font-family: Poppins; font-size: 16px; font-weight: 400; line-height: 24px
- color: **rgb(255, 255, 255)**
- **transition: color 0.3s**
- Note the hrefs are asymmetric on the live site: "TERMS OF SERVICES" points at `/cookie-policy`,
  not `/terms-of-services`. Reproduce it as measured.
- Spacing: the links sit at x = 931 / 1072 / 1096, i.e. roughly **16px** between each item.

## States & Behaviors

### Hover — legal links
- **State A:** color rgb(255, 255, 255)
- **State B:** color rgb(51, 51, 51)
- **Transition:** color 0.3s
- The `/` separator does not respond to hover.

### Scroll / click / time
None.

## Per-State Content
N/A — single static state.

## Assets
None.

## Text Content (verbatim)
```
© 2023 Designally Co., Ltd. All Rights Reserved
PRIVACY POLICY / TERMS OF SERVICES
```
Note the `©` character and the `Co., Ltd.` punctuation.

## Responsive Behavior
- **Desktop (≥1025px):** one row, copyright left, links right.
- **Tablet (768–1024px):** unchanged — one row; the container widens to 88% so the two groups sit
  closer together.
- **Mobile (≤767px):** stacks to a **column**, centred, with ~8px between the copyright and the link
  row; the bar's height grows to fit two lines (roughly 88px) and vertical padding stays 16px.

## Build notes
- Server component — no `"use client"`.
- Use `.dsg-container`.
- Render `<footer>` as the semantic element.
- Verify `npx tsc --noEmit` passes before finishing.
