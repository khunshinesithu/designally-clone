# /about/ Page Specification — horizontal scroller

- **Route:** `src/app/about/page.tsx`
- **Page key:** `about-4f10f17b` · **Site key:** `designally-co-e422ade5`
- **Dimensions:** document height ~961px (one viewport); **`<main>` scrollWidth 12108px**
- **Raw extraction (4 files, all double-JSON-encoded):** `extract-about-panels.json`,
  `extract-about-rest.json`, `extract-about-lists.json`, `extract-about-hero.json`

**This is the most unusual page on the site.** It scrolls sideways, has no CTA and no footer, and
its content is ten fixed-width panels laid out in a row.

## The defining behaviour — horizontal scroll

The live page ships exactly this inline script:

```js
if (window.innerWidth > 1025) {
   const scrollContainer = document.querySelector("main");
   scrollContainer.addEventListener("wheel", (evt) => {
       evt.preventDefault();
       scrollContainer.scrollLeft += evt.deltaY;
   });
}
```

- `<main>`: `display: flex; flex-direction: row; overflow-x: auto; overflow-y: auto`,
  height 829px, clientWidth 1425, **scrollWidth 12108**
- Track (`21e1c2b`): `display: flex; flex-direction: row; gap: 0; padding: 30px 0 0`, width 12108
- **Desktop only (> 1025px).** Below that the listener is not attached and the page scrolls normally.

**Implementation:** reproduce the wheel→`scrollLeft` mapping in a `useEffect` with
`{ passive: false }` (it calls `preventDefault`), attached only when `window.innerWidth > 1025`,
and removed on unmount. Re-evaluate on resize. Below 1025px, let the panels stack vertically and
scroll normally — do not attach the listener.

Accessibility: keyboard users get no horizontal scroll from this script on the live site. Add
`tabIndex={0}` and keyboard arrow handling on the scroll container, or at minimum ensure every panel
remains reachable by Tab (browsers scroll focused elements into view). Say what you chose.

## Panels — 10, left to right

| # | id | width | Content |
|---|---|---|---|
| 0 | `f56a6fa` | 1440 | Hero: "Simplicity." + paragraph + Scroll-to-Navigate badge |
| 1 | `288e7f6` | 1440 | "Our name is a combination of the words 'design' and 'ally.'" |
| 2 | `6ecd68d` | 1440 | Cycling word: Simple. / Right. / Works. / Lasts. |
| 3 | `6d2eec7` | 1440 | Client logo wall — 48 logos |
| 4 | `a69e241` | **691** | "various businesses" |
| 5 | `eb910cc` | 1440 | Industry lists: Agencies 5 · Bars & Restaurants 12 · Corporate 12 · Consumer Products 25 |
| 6 | `09a4fa2` | 1440 | Industry lists: Education 8 · … |
| 7 | `43cd37e` | 1440 | Industry lists: Government 8 · Hotels 7 |
| 8 | `6462a1e` | **689** | Industry list: Others 13 |
| 9 | `c96252e` | **647** | Orange CTA panel |

Widths sum to 12107 ≈ the measured 12108. Panels 4, 8 and 9 are deliberately narrower.

## Panel 0 — Hero `f56a6fa`

- 1440 × 948, `padding: 0 80px 80px`
- Headline `Simplicity.` — **EB Garamond 200px / 500**. The `i` is a separate italic `<i>` element
  (61 × 261 at x=891) — same signature trick as "OUR SERV*I*CES". Colour `rgb(51, 51, 51)`.
- Paragraph — Poppins **16px / 400**, `rgb(33, 33, 33)`, box 605 × 152 at x=418, y=570:
  > We believe that simplicity enhances efficiency, fosters clear communication, and drives successful outcomes. Embrace simplicity in the way we work to streamline processes and achieve remarkable results.
- **"Secret Recipe" arrow** — `/sites/designally-co-e422ade5/about-4f10f17b/svg/secret-recipe-arrow.svg`
  (viewBox `0 0 80 124`, rendered 82 × 54)
- **Scroll-to-Navigate badge** — `/sites/…/about-4f10f17b/svg/scroll-to-navigate-badge.svg`
  (viewBox `0 0 135 129`, rendered 115 × 110), an orange blob sitting bottom-right, with the words
  `Scroll to` / `Navigate` on top of it in **Caveat 32px / 700**, `rgb(33, 33, 33)`, each line
  slightly rotated (measured at x=1232,y=742 and x=1261,y=767 — the two lines are offset and
  angled, not stacked squarely).

## Panel 1 — Name explanation `288e7f6`

Poppins **40px / 500**, `rgb(33, 33, 33)`, with the two quoted words in **`rgb(245, 99, 65)`**:

> Our name is a combination / of the words / **"design"** / and / **"ally."**

Each run is its own element — the extraction lists them separately, in that order.

Two hand-drawn highlight strokes sit behind the quoted words:
- `/sites/…/about-4f10f17b/svg/design-highlight.svg` (viewBox `0 0 368 81`, rendered 363 × 80)
- `/sites/…/about-4f10f17b/svg/ally-highlight.svg` (viewBox `0 0 316 81`, rendered 312 × 80)
- plus `double-chevron.svg` (viewBox `0 0 18 40`, 18 × 40) — the same two-tone mark used elsewhere;
  the shared `DoubleChevronIcon` can be used instead.

Body paragraph, Poppins 16px/400:
> It embodies our philosophy of being a creative design ally for our clients. Our aim is to be the trusted partner that businesses can rely on…
(full string in `extract-about-panels.json`)

## Panel 2 — Cycling word `6ecd68d`

- Four `<span>`s — `Simple.` `Right.` `Works.` `Lasts.` — **all at the same position** (x=3586, y=360),
  EB Garamond **180px / 500**, **`rgb(245, 99, 65)`**. They are stacked and cycled by Elementor's
  animated headline.
- A separate italic `i` (EB Garamond 180px/500, `rgb(33, 33, 33)`) sits at x=3432 — i.e. the line
  reads as a dark fragment followed by the cycling orange word.
- **Build it as a timed cycle** through the four words (fade or slide). The live interval was not
  measured — pick ~2s, and say so.

## Panel 3 — Client logo wall `6d2eec7`

- **48 logos**, each rendered **98 × 69** (source 174 × 123), with the client name beneath in
  Poppins **16px / 400**, **`rgb(255, 255, 255)`** — white text, so the wall sits on a dark ground.
  No dark background element was captured on the panel itself; paint the panel
  `rgb(33, 33, 33)` (the site's ink) unless the extraction shows otherwise, and flag the choice.
- All 48 files are downloaded to `/sites/designally-co-e422ade5/about-4f10f17b/images/`.
  The **order of `srcs` in `extract-about-rest.json` matches the order of `names`** one-to-one —
  pair them by index. Names, in order:

  CP Land · Marriott · Bangkok University · Bitazza · Airports of Thailand · Major Cineplex ·
  DDProperty · Aroma Group · Property Perfect · SO/ Bangkok · Chulalongkorn University · StashAway ·
  Provincial Electricity Authority · Siam Cement Group · Lazada · Chao Doi · SC ASSET · Avani+ Bangkok ·
  Kasetsart University · SuperRich · MCOT · Muang Thai Life Assurance · LINE · Fat Coco · K Village ·
  Boonthavorn · Thammasat University · Transmission Festival · INN News · Betagro · Pomelo ·
  Shinsen Fish Market · Seacon Bangkae · Villeroy & Boch · Sripatum University · Unkonscious Festival ·
  MJets · Banpu NEXT · ZALORA · Tim Ho Wan Thailand · Siam Amazing Park · KOZE Furniture ·
  Raffles Design Institute · Mystic Valley Festival · Thai Sang Thai Party · Huawei · Mespace · Haoma Bangkok

  The filenames are numbered `01-`…`48-` but appear in the DOM in **column order, not numeric order**
  (01, 07, 13, 19, 25, 31, 37, 43, 02, 08, …) — that is an 8-row × 6-column grid filled top-to-bottom.
  Use the DOM order from the JSON; do not re-sort numerically.

## Panel 4 — `a69e241` (691 wide)

Single line: `various businesses` — Poppins **40px / 600**, **`rgb(245, 99, 65)`**.

## Panels 5–8 — Industry lists

Each column is: a category heading (Poppins **20px / 500**, `rgb(245, 99, 65)`), a count
(Poppins **14px / 400**, `rgb(245, 99, 65)`) beside it, then the client names
(Poppins **16px / 400**, `rgb(51, 51, 51)`) on a **28px line pitch**.

| Panel | Category | Count |
|---|---|---|
| 5 | Agencies | 5 |
| 5 | Bars & Restaurants | 12 |
| 5 | Corporate | 12 |
| 5 | Consumer Products | 25 (wraps into two sub-columns after 13 entries) |
| 6 | Education | 8 |
| 7 | Government | 8 |
| 7 | Hotels | 7 |
| 8 | Others | 13 |

**The complete name lists for every category are in `extract-about-lists.json`** — read them from
there rather than retyping. Panel 6's and 7's remaining categories are in that file too; the spec
above lists only the ones visible in the summary output.

## Panel 9 — Orange CTA `c96252e` (647 wide)

- `background: rgb(245, 99, 65)`, **`border-radius: 80px 0 0 0`**, `padding: 0 0 0 160px`, 647 × 814
- `Tell us about your project` — Poppins **20px / 500**, `rgb(255, 255, 255)`
- `Call Us` and `Contact Us` — Poppins **43px / 500**, `rgb(255, 255, 255)`. `Call Us` measured
  0 × 0 while `Contact Us` measured 325 × 56, i.e. these two also **cycle** in the same slot.
  There is an italic `t` (EB Garamond 85px/500, white) alongside.
- An 80 × 80 image at the bottom: `/sites/…/about-4f10f17b/images/chicken.png` (downloaded)
- Link targets were not captured — point `Call Us` at `tel:0650055993` and `Contact Us` at
  `/contact-us/`, and flag that as an assumption.

## No CTA, no footer

`/about/` has **neither** the orange `CtaSection` nor `SiteFooter` — the live page ends at panel 9.
Render only `FloatingHeader` + `SiteHeader` + the scroller. Both headers take `activeNav="/about/"`.

## Metadata

- `<title>`: `About DESIGNALLY`

## Responsive

- **> 1025px:** horizontal scroller as specified.
- **≤ 1025px:** the wheel listener is not attached. Stack the ten panels vertically at full width
  and let the page scroll normally. Type scales down: 200px → ~64px, 180px → ~56px, 40px → ~28px.
  The logo wall becomes a 3- or 4-column grid. Say what you chose — none of this was measured.

## Build notes
- `"use client"` is required (wheel listener + the two cycling headlines).
- The oversized panels mean `<main>` must NOT inherit the app's usual column layout — give the
  scroller its own wrapper rather than reusing `dsg-site`'s flex column, or the row will collapse.
- Verify `npx tsc --noEmit` and `npm run build` before finishing.
