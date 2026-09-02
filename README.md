# Designally

A Next.js recreation of [designally.co](https://designally.co), built as a static site.

Six routes, matching the original's layout, typography and interactions.

## Getting started

Requires Node.js 24+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run check` | Lint + typecheck + build — **run this before every push** |

## Routes

| Route | Notes |
|---|---|
| `/` | Video carousel hero, sticky services panel, filterable works gallery |
| `/services/` | Sticky panel with five service cards, four-step process section |
| `/works/` | 74-tile filterable gallery with load-more, six case studies |
| `/about/` | **Scrolls horizontally** — ten panels, 12 000px wide, desktop only |
| `/thoughts/` | Blog listing, nine posts |
| `/contact-us/` | Enquiry form, Google Map embed |

All six prerender as static pages.

## Tech stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **Fonts** — Poppins (UI), EB Garamond (display), Caveat (handwriting accents), all via `next/font/google`

## Project structure

Components are namespaced per page, so work on one page rarely touches another:

```
src/
  app/                     routes — one folder per page
  components/sites/designally-co-e422ade5/
    shared/                used by EVERY page — headers, footer, CTA, case studies, icons
    root-8a5edab2/         homepage only
    services-eeda784a/     /services/ only
    works-cad9886f/        /works/ only
    about-4f10f17b/        /about/ only
    thoughts-e2a689e8/     /thoughts/ only
    contact-us-ae5848da/   /contact-us/ only
  types/designally.ts      shared content types
public/sites/designally-co-e422ade5/
  shared/                  logos, SVGs, favicons
  <page-key>/              images and video for that page
```

The odd-looking folder names (`root-8a5edab2`, `works-cad9886f`) are stable page keys — a readable slug plus a short hash of the source path. They keep each page's components, assets and notes from colliding.

## Working on this with someone else

Most of the codebase is naturally isolated — two people on different pages touch no files in common.

**Three places are shared, and changes there affect every page:**

- `src/components/sites/designally-co-e422ade5/shared/` — headers, footer, CTA, case-study section
- `src/app/globals.css` — design tokens, container widths
- `src/app/layout.tsx` and `src/types/designally.ts`

Suggested workflow:

1. One branch per page — `refine/works`, `refine/about`.
2. Merge through pull requests rather than pushing to `master`.
3. Land shared-file changes as their own small PR, and tell the other person before you start.
4. Run `npm run check` before pushing.
5. After changing anything in `shared/`, check the other pages still look right — a passing build won't catch a layout regression.

**Assets are binary and can't be merged.** Rather than editing images by hand, re-download them with the scripts in `scripts/`:

```bash
node scripts/download-assets-designally-co-e422ade5-works-cad9886f.mjs
```

Each script only writes into its own page's asset folder and skips files that already exist.

## Documentation

`docs/` holds the notes from building this:

- `docs/research/designally-co-e422ade5/<page-key>/` — per-page component specs with measured values, plus the raw extraction data
- `docs/research/designally-co-e422ade5/root-8a5edab2/VISUAL_QA.md` — how closely each page matches the original, and the known gaps
- `docs/design-references/designally-co-e422ade5/` — reference screenshots

Worth reading before changing layout values: most numbers in the components were measured from the original rather than chosen, and the specs say which.

## Known limitations

- The contact form validates but **does not submit anywhere** — there is no backend.
- Sub-1025px styling on the five inner pages is approximate; only the desktop layout was measured.
- A few decorative icons are redrawn rather than extracted.

See `VISUAL_QA.md` for the full list.

## Licence

This project was scaffolded from the MIT-licensed
[ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template);
see [LICENSE](LICENSE). Site content, imagery and branding belong to Designally.
