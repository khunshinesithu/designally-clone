# Output Plan — designally.co

## Target
| Field | Value |
|---|---|
| Source URL | https://designally.co/ |
| Normalized origin | https://designally.co |
| Normalized pathname | / |
| `<app-root>` | `.` (repository root — single origin, single app) |
| `<site-key>` | `designally-co-e422ade5` (sha256("https://designally.co")[0:8] = e422ade5) |
| `<page-key>` | `root-8a5edab2` (sha256("/")[0:8] = 8a5edab2) |
| Destination route | `/` → `src/app/page.tsx` |

## Roots
- Artifacts: `docs/research/designally-co-e422ade5/root-8a5edab2/`
- Screenshots: `docs/design-references/designally-co-e422ade5/root-8a5edab2/`
- Components: `src/components/sites/designally-co-e422ade5/root-8a5edab2/`
- Same-site shared components: `src/components/sites/designally-co-e422ade5/shared/`
- Assets: `public/sites/designally-co-e422ade5/root-8a5edab2/`
- Same-site shared assets: `public/sites/designally-co-e422ade5/shared/`
- Downloader: `scripts/download-assets-designally-co-e422ade5-root-8a5edab2.mjs`

## Pre-flight findings
- Browser automation: in-app Browser pane (`mcp__Claude_Browser__*`). Chrome MCP not connected; Playwright MCP available but unused. Verified `https://designally.co/` loads (HTTP 200, title "DESIGNALLY | Your Creative Design Ally").
- Base build: `npm run build` exit 0. Routes before this run: `/`, `/_not-found`.
- Existing work inventory: untouched template scaffold only — `src/app/page.tsx` (Next.js starter), `src/app/layout.tsx`, `src/components/ui/button.tsx`. No prior cloned routes, research artifacts, screenshots, or site asset namespaces.
- Collision check: no planned route, artifact root, screenshot root, component root, asset root, or downloader filename collides with existing output.

## Route decision
First single-URL clone into an untouched template → the starter scaffold at `src/app/page.tsx` is replaced so the clone serves at `/`. No user-authored or previously cloned route is affected.

## Shared foundation changes (single origin — no multi-site conflict)
- `src/app/layout.tsx` — fonts + root metadata for designally.co
- `src/app/globals.css` — design tokens merged from the target palette

## Target stack (observed)
WordPress + Elementor (Hello Elementor theme, child theme `hello-theme-child-master`), WPML multilingual, jQuery. Page height 11361px at 1440px viewport.
