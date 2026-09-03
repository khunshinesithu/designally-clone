import type { Metadata } from "next";

import { CaseStudySection } from "@/components/sites/designally-co-e422ade5/shared/CaseStudySection";
import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";
import { WorksPageContent } from "@/components/sites/designally-co-e422ade5/works-cad9886f/WorksPageContent";
import { getCaseStudies, getWorkItems } from "@/sanity/lib/content";

/**
 * Clone of https://designally.co/works/ — site key designally-co-e422ade5,
 * page key works-cad9886f.
 *
 * Section order and geometry follow
 * docs/research/designally-co-e422ade5/works-cad9886f/components/works-page.spec.md.
 *
 * Page-level notes:
 * - `FloatingHeader` is rendered outside the flow: it is `position: fixed` and must
 *   overlay every section, so it cannot live inside one.
 * - There is no 20px spacer here, unlike `/`: the masthead starts at y=132, flush
 *   against the 131px-tall header.
 * - `WORKS_CONTAINER` is declared here rather than in `WorksPageContent` because
 *   that file is a `"use client"` module — a server component importing a constant
 *   from one receives a client reference instead of the value. The route owns it
 *   and hands it down as a prop.
 * - Gallery tiles and case studies now come from `@/sanity/lib/content`, which
 *   reads Sanity when configured and the extracted seed when it is not.
 */

/**
 * The page container: a fixed 1200px centred box (content starts at x=113 in the
 * measured 1425px viewport), NOT the homepage's fluid 75% `.dsg-container`.
 * Written as a 1280px box with 40px gutters so the content is exactly 1200px wide
 * at the measured width while never touching the viewport edge at the narrower
 * widths that were not measured.
 */
const WORKS_CONTAINER = "mx-auto w-full max-w-[1280px] px-[24px] tab:px-[40px]";

export const metadata: Metadata = {
  title: "Works | DESIGNALLY",
  // Overrides the root layout's canonical, which points at the homepage.
  alternates: { canonical: "https://designally.co/works/" },
};

export default async function WorksPage() {
  // All 74 tiles and all six case studies — the homepage renders the subsets.
  const [workItems, caseStudies] = await Promise.all([
    getWorkItems(false),
    getCaseStudies(false),
  ]);
  const galleryItems = workItems.map((i) => ({ ...i, src: i.imageUrl }));
  const studies = caseStudies.map((c) => ({
    ...c,
    image: { src: c.imageUrl, alt: c.alt, width: c.width, height: c.height },
  }));

  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/works/" />

      <SiteHeader activeNav="/works/" />

      <main className="flex flex-col">
        {/* Masthead `aa96562` + the 76-item gallery `13a2e40`. */}
        <WorksPageContent containerClassName={WORKS_CONTAINER} items={galleryItems} />

        {/*
          Case Study `d8038f9` — the shared component with six cards. The card is
          fluid: its measured 588px here is just (1200 − 24px gap) / 2, so passing
          the container is all it needs.
        */}
        {/*
          Measured on the live /works/ page: the case-study inner is `padding: 0 0 160px`
          (its heading sits flush with the section top, unlike the homepage's 160px top
          padding) and there is no "View All Projects" pill — it would link to this page.
        */}
        <CaseStudySection
          studies={studies}
          containerClassName={WORKS_CONTAINER}
          paddingClassName="pb-[160px]"
          showViewAll={false}
        />

        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
