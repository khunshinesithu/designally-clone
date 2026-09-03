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
| `/works/<slug>/` | Six project case studies — one dynamic route, video hero, full-bleed gallery |
| `/about/` | **Scrolls horizontally** — ten panels, 12 000px wide, desktop only |
| `/thoughts/` | Blog listing, nine posts |
| `/contact-us/` | Enquiry form, Google Map embed |

All eleven prerender as static pages.

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

## Content (Sanity CMS)

Blog posts, gallery tiles, case studies and service cards live in
[Sanity](https://www.sanity.io). Everything else — layout, the hero carousel, the `/about/`
panels, contact copy — is still in code.

**The site builds and runs without Sanity configured.** When it is unset, content comes from
`sanity/seed-data.json`, which holds the same entries the components used to carry inline. That
keeps CI green and means a fresh clone works with no setup.

### One-time setup

**This is already done for the shared project** — the dataset holds all 99 documents. You only
need `.env.local`:

```bash
cp .env.example .env.local
```

Fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (ask a teammate, or read
them off [sanity.io/manage](https://sanity.io/manage)). Reading is public, so no token is needed to
run the site. To edit in the Studio, run `npx sanity login` once with an account that has been
invited to the project.

The steps below were the one-time import, kept for reference:

```bash
node scripts/extract-seed-data.mjs        # refresh the seed from the components
node scripts/migrate-to-sanity.mjs --dry-run
node scripts/migrate-to-sanity.mjs        # uploads 94 images, creates 99 documents
```

The migration is idempotent — document ids are deterministic, so re-running updates rather than
duplicates, and images already uploaded are reused. It authenticates with your `sanity login`
session; set `SANITY_API_WRITE_TOKEN` (an Editor token from
[sanity.io/manage](https://sanity.io/manage) → API → Tokens) to use a scoped token instead.
`.env.local` is gitignored — never commit a token.

### Editing

Run `npm run dev` and open http://localhost:3000/studio.

| Type | What it drives |
|---|---|
| **Work item** | Gallery tiles on `/` and `/works/`. `Show in the homepage gallery` picks the homepage subset. |
| **Case study** | Cards on `/` and `/works/`. `Show on the homepage` picks the four the homepage shows. |
| **Service card** | Cards on `/` and `/services/`. The `Page` field decides which — the two pages use different copy. |
| **Thought** | The `/thoughts/` listing. |

A case study is both the card and the detail page at `/works/<slug>/`: the fields from
**Slug** down drive the detail page, and **Next up** is a reference to another case study, so the
six form a ring.

Three things to know:

- **Dates are plain strings, not date pickers.** The original renders Thai dates
  (`กรกฎาคม 17, 2024`); a real date field would force a locale conversion and change what readers
  see. Type them exactly as they should appear.
- **Ordering is the `Order` number**, not alphabetical or by date — the gallery sequence is
  deliberate.
- **Case-study videos live only in Sanity.** They are 133MB, so they are gitignored rather than
  committed. A clone with Sanity configured serves them from the CDN; without it, the seed
  fallback references local files that are not in the repository and the video blocks render
  empty. Run the case-study downloader if you need them locally.

Pages revalidate hourly (`REVALIDATE_SECONDS` in `sanity/lib/client.ts`), so a published change
appears within the hour without a redeploy. Content still renders at build time, so all six pages
stay static.

### Layout

```
sanity/
  env.ts            project id / dataset, tolerant of being unset
  schemas/          the four document types
  lib/client.ts     read client + revalidate interval
  lib/content.ts    the ONLY place pages get content — Sanity, else the seed
  lib/queries.ts    GROQ
  seed-data.json    fallback content, generated by scripts/extract-seed-data.mjs
sanity.config.ts    Studio config, mounted at /studio
```

Pages call `getWorkItems`, `getCaseStudies`, `getServices` and `getPosts` from `lib/content.ts`.
Those return render-ready shapes with `imageUrl` already resolved, so components never know or care
whether the content came from the CMS or the seed.


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
