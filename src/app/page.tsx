import { BreakLimitsSection } from "@/components/sites/designally-co-e422ade5/root-8a5edab2/BreakLimitsSection";
import { CaseStudySection } from "@/components/sites/designally-co-e422ade5/shared/CaseStudySection";
import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { HeroShowcase } from "@/components/sites/designally-co-e422ade5/root-8a5edab2/HeroShowcase";
import { IntroSection } from "@/components/sites/designally-co-e422ade5/root-8a5edab2/IntroSection";
import { ServicesSection } from "@/components/sites/designally-co-e422ade5/root-8a5edab2/ServicesSection";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";
import { WorksGallery } from "@/components/sites/designally-co-e422ade5/root-8a5edab2/WorksGallery";
import { getCaseStudies, getServices, getWorkItems } from "@/sanity/lib/content";

/**
 * Clone of https://designally.co/ — site key designally-co-e422ade5, page key root-8a5edab2.
 *
 * Section order and page-level layout follow
 * docs/research/designally-co-e422ade5/root-8a5edab2/PAGE_TOPOLOGY.md.
 *
 * Page-level notes:
 * - `FloatingHeader` is rendered outside the flow: it is `position: fixed` and must overlay
 *   every section, so it cannot live inside one.
 * - There is no page-level scroll container and no scroll-snap. The in-page anchors
 *   (#Branding, #Website, #DesignAlly) rely on `html { scroll-behavior: smooth }` from
 *   globals.css — the live site uses native smooth scroll, not Lenis or Locomotive.
 * - The 20px spacer between the header and the hero reproduces the live section
 *   `.elementor-element-e4c35ae`.
 */
export default async function Home() {
  // Content comes from Sanity when configured, otherwise from the extracted
  // seed. Both arrive as render-ready shapes; the components' own types still
  // name the image `src`, so adapt at this boundary.
  const [workItems, caseStudies, serviceCards] = await Promise.all([
    getWorkItems(true),
    getCaseStudies(true),
    getServices("home"),
  ]);
  const galleryItems = workItems.map((i) => ({ ...i, src: i.imageUrl }));
  const studies = caseStudies.map((c) => ({
    ...c,
    image: { src: c.imageUrl, alt: c.alt, width: c.width, height: c.height },
  }));
  const services = serviceCards.map((s) => ({
    anchorId: s.anchorId ?? undefined,
    eyebrow: s.eyebrow,
    title: s.title,
    description: s.description,
    tags: s.tags,
    image: { src: s.imageUrl, alt: s.alt, width: 800, height: 501 },
  }));

  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader />

      <SiteHeader />

      {/* Spacer section `e4c35ae` — 20px between the header and the hero. */}
      <div aria-hidden="true" className="h-[20px] w-full" />

      <main className="flex flex-col">
        <HeroShowcase />
        <IntroSection />
        <ServicesSection cards={services} />
        <WorksGallery items={galleryItems} />
        <BreakLimitsSection />
        <CaseStudySection studies={studies} />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
