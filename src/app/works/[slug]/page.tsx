import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyContent } from "@/components/sites/designally-co-e422ade5/case-study-a1bbf35d/CaseStudyContent";
import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";
import { getCaseStudy, getCaseStudySlugs } from "@/sanity/lib/content";

/**
 * Clone of the six https://designally.co/works/<slug>/ project pages.
 * Site key designally-co-e422ade5, page key case-study-a1bbf35d.
 *
 * All six are one Elementor `single-post` template, so this is a single dynamic
 * route rendered per slug rather than six hand-built pages. Geometry and the
 * section order are in
 * docs/research/designally-co-e422ade5/works-cad9886f/case-study-page.spec.md.
 *
 * `dynamicParams = false` makes any slug outside the CMS a 404 rather than an
 * on-demand render, which keeps the route fully static like the other six pages.
 *
 * The header is overlaid here, unlike every other route: the page opens on a
 * full-bleed video band that starts at y=0 on the original.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.metaTitle} | DESIGNALLY`,
    description: study.metaDescription ?? undefined,
    alternates: { canonical: `https://designally.co/works/${slug}/` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/works/" />
      <SiteHeader activeNav="/works/" overlay />

      <main className="flex flex-col">
        <CaseStudyContent study={study} />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
