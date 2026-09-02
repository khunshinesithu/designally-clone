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
export default function Home() {
  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader />

      <SiteHeader />

      {/* Spacer section `e4c35ae` — 20px between the header and the hero. */}
      <div aria-hidden="true" className="h-[20px] w-full" />

      <main className="flex flex-col">
        <HeroShowcase />
        <IntroSection />
        <ServicesSection />
        <WorksGallery />
        <BreakLimitsSection />
        <CaseStudySection />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
