import type { Metadata } from "next";

import { CaseStudySection } from "@/components/sites/designally-co-e422ade5/shared/CaseStudySection";
import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";
import { WorksPageContent } from "@/components/sites/designally-co-e422ade5/works-cad9886f/WorksPageContent";
import type { DsgCaseStudy } from "@/types/designally";

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
 * - `WORKS_CONTAINER` and `WORKS_CASE_STUDIES` are declared here rather than in
 *   `WorksPageContent` because that file is a `"use client"` module — a server
 *   component importing a constant from one receives a client reference instead of
 *   the value, which silently breaks `studies.map`. The route therefore owns both
 *   and hands the container down to the client gallery as a prop.
 */

/**
 * The page container: a fixed 1200px centred box (content starts at x=113 in the
 * measured 1425px viewport), NOT the homepage's fluid 75% `.dsg-container`.
 * Written as a 1280px box with 40px gutters so the content is exactly 1200px wide
 * at the measured width while never touching the viewport edge at the narrower
 * widths that were not measured.
 */
const WORKS_CONTAINER = "mx-auto w-full max-w-[1280px] px-[24px] tab:px-[40px]";

const CASE_IMAGE_BASE_ROOT = "/sites/designally-co-e422ade5/root-8a5edab2/images";
const CASE_IMAGE_BASE_WORKS = "/sites/designally-co-e422ade5/works-cad9886f/images";

/**
 * The six cards of this page's Case Study section, in reading order (the homepage
 * shows the first four). Those four reuse the images already downloaded for `/`;
 * Nourigo and Fatcoco are unique to `/works/`. Every href stays absolute — the
 * individual project pages are outside this clone.
 *
 * `meta` is "<Industry> / <Services>", the shape `shared/CaseStudySection` splits
 * at its first " / ". Every image is 800 x 450 natural. Not exported: a route
 * module may only export `default`, `metadata` and the other Next.js route keys.
 */
const WORKS_CASE_STUDIES: readonly DsgCaseStudy[] = [
  {
    client: "Skytower",
    meta: "Industrial & Manufacturing / Branding / Website",
    href: "https://designally.co/works/skytower-rebranding-and-website-projects/",
    image: {
      src: `${CASE_IMAGE_BASE_ROOT}/Skytower-1024x576.jpg`,
      alt: "Skytower",
      width: 800,
      height: 450,
    },
  },
  {
    client: "Bitazza Thailand/Global",
    meta: "Financial Services / Design Support / Website",
    href: "https://designally.co/works/bitazza-design-support-and-website/",
    image: {
      src: `${CASE_IMAGE_BASE_ROOT}/Bitazza-1024x576.jpg`,
      alt: "Bitazza Thailand/Global",
      width: 800,
      height: 450,
    },
  },
  {
    client: "Laga",
    meta: "Consumers Products / Branding / Website",
    href: "https://designally.co/works/laga-branding-and-website-project/",
    image: {
      src: `${CASE_IMAGE_BASE_ROOT}/LAGA-1024x576.jpg`,
      alt: "Laga",
      width: 800,
      height: 450,
    },
  },
  {
    client: "INN News",
    meta: "Corporate / Branding / Website",
    href: "https://designally.co/works/inn-news-rebranding-and-website-projects/",
    image: {
      src: `${CASE_IMAGE_BASE_ROOT}/INN-News-1024x576.jpg`,
      alt: "INN News",
      width: 800,
      height: 450,
    },
  },
  {
    client: "Nourigo",
    meta: "Consumers Products / Branding",
    href: "https://designally.co/works/nourigo-supplements-branding-project/",
    image: {
      src: `${CASE_IMAGE_BASE_WORKS}/Nourigo-1024x576.jpg`,
      alt: "Nourigo",
      width: 800,
      height: 450,
    },
  },
  {
    client: "Fatcoco",
    meta: "Bars & Restaurants / Website",
    href: "https://designally.co/works/fatcoco-fb-website-project/",
    image: {
      src: `${CASE_IMAGE_BASE_WORKS}/Fatcoco-1024x576.jpg`,
      alt: "Fatcoco",
      width: 800,
      height: 450,
    },
  },
];

export const metadata: Metadata = {
  title: "Works | DESIGNALLY",
  // Overrides the root layout's canonical, which points at the homepage.
  alternates: { canonical: "https://designally.co/works/" },
};

export default function WorksPage() {
  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/works/" />

      <SiteHeader activeNav="/works/" />

      <main className="flex flex-col">
        {/* Masthead `aa96562` + the 76-item gallery `13a2e40`. */}
        <WorksPageContent containerClassName={WORKS_CONTAINER} />

        {/*
          Case Study `d8038f9` — the shared component with six cards. The card is
          fluid: its measured 588px here is just (1200 − 24px gap) / 2, so passing
          the container is all it needs.
        */}
        <CaseStudySection
          studies={WORKS_CASE_STUDIES}
          containerClassName={WORKS_CONTAINER}
        />

        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
