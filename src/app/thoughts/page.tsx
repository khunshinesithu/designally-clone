import type { Metadata } from "next";

import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";
import { ThoughtsPage } from "@/components/sites/designally-co-e422ade5/thoughts-e2a689e8/ThoughtsPage";
import { getPosts } from "@/sanity/lib/content";

/**
 * Clone of https://designally.co/thoughts/ — site key designally-co-e422ade5,
 * page key thoughts-e2a689e8.
 *
 * Section order follows
 * docs/research/designally-co-e422ade5/thoughts-e2a689e8/components/thoughts-page.spec.md:
 * header (131) -> masthead (368) -> listing (3646) -> CTA (669) -> footer (57).
 *
 * Page-level notes:
 * - `FloatingHeader` is rendered outside the flow, exactly as on `/`: it is
 *   `position: fixed` and must overlay every section, so it cannot live inside
 *   one.
 * - Both headers get `activeNav="/thoughts/"`, which paints the THOUGHTS nav
 *   entry orange and marks it `aria-current="page"`.
 * - There is no 20px header/hero spacer here — unlike `/`, the masthead follows
 *   the header directly (measured: header ends at y=131, masthead starts at
 *   y=132) and carries its own 80px of top padding.
 * - Nothing on this page is interactive, so every component below is a server
 *   component.
 */
export const metadata: Metadata = {
  title: "Thoughts | DESIGNALLY",
  alternates: { canonical: "https://designally.co/thoughts/" },
};

export default async function Thoughts() {
  // `getPosts` returns the render-ready view shape; the component's own type
  // still calls the thumbnail `src`. Adapting here keeps the mapping at the
  // data boundary rather than pushing CMS naming into the component.
  const posts = (await getPosts()).map((p) => ({ ...p, src: p.imageUrl }));

  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/thoughts/" />

      <SiteHeader activeNav="/thoughts/" />

      <main className="flex flex-col">
        <ThoughtsPage posts={posts} />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
