import type { Metadata } from "next";

import { AboutScroller } from "@/components/sites/designally-co-e422ade5/about-4f10f17b/AboutScroller";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";

/**
 * Clone of https://designally.co/about/ — site key designally-co-e422ade5,
 * page key about-4f10f17b.
 *
 * Structure follows
 * docs/research/designally-co-e422ade5/about-4f10f17b/components/about-page.spec.md.
 *
 * Page-level notes:
 * - This is the only page on the site that scrolls sideways. Everything below the
 *   two headers lives in `AboutScroller`, which owns the `<main>` element, the
 *   wheel-to-`scrollLeft` listener and all ten panels.
 * - `/about/` has **no** orange `CtaSection` and **no** `SiteFooter` — the live page
 *   ends at the tenth panel. Do not add them.
 * - The page wrapper is `h-screen` with `overflow-hidden` above 1025px so the only
 *   scrolling surface is the track itself; below that the wrapper is a normal
 *   `min-h-screen` column and the page scrolls vertically as usual.
 * - `FloatingHeader` is fixed and must overlay the track, so it stays outside it.
 *   Both headers take `activeNav="/about/"` so ABOUT renders in the active orange
 *   state.
 */
export const metadata: Metadata = {
  title: "About DESIGNALLY",
  alternates: { canonical: "https://designally.co/about/" },
};

export default function AboutPage() {
  return (
    <div className="dsg-site flex min-h-screen flex-col desk:h-screen desk:min-h-0 desk:overflow-hidden">
      <FloatingHeader activeNav="/about/" />

      <SiteHeader activeNav="/about/" />

      <AboutScroller />
    </div>
  );
}
