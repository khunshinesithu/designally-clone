import type { Metadata } from "next";

import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { ServicesPageContent } from "@/components/sites/designally-co-e422ade5/services-eeda784a/ServicesPageContent";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";

export const metadata: Metadata = {
  title: "Services | DESIGNALLY",
};

/**
 * Clone of https://designally.co/services/ — site key designally-co-e422ade5,
 * page key services-eeda784a.
 *
 * Section order and page-level layout follow
 * docs/research/designally-co-e422ade5/services-eeda784a/components/services-page.spec.md.
 *
 * Page-level notes:
 * - `FloatingHeader` is rendered outside the flow: it is `position: fixed` and must overlay
 *   every section, so it cannot live inside one.
 * - Both headers get `activeNav="/services/"` so the SERVICES entry renders orange.
 * - Unlike the homepage there is no 20px spacer between the header and the first section:
 *   the hero video band butts straight up against `SiteHeader`.
 */
export default function ServicesPage() {
  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/services/" />

      <SiteHeader activeNav="/services/" />

      <main className="flex flex-col">
        <ServicesPageContent />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
