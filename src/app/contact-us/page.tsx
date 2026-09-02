import type { Metadata } from "next";

import { ContactPage } from "@/components/sites/designally-co-e422ade5/contact-us-ae5848da/ContactPage";
import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";

/**
 * Clone of https://designally.co/contact-us/ — site key designally-co-e422ade5,
 * page key contact-us-ae5848da.
 *
 * Section order follows
 * docs/research/designally-co-e422ade5/contact-us-ae5848da/components/contact-page.spec.md:
 * hero, "Don't be shy" band, inquiry form, Google map, customer support — then the
 * shared orange CTA and the footer, exactly as on the live page.
 *
 * Page-level notes:
 * - `FloatingHeader` is rendered outside the flow: it is `position: fixed` and must
 *   overlay every section, so it cannot live inside one.
 * - Both headers take `activeNav="/contact-us/"` so the CONTACT entry renders in the
 *   active orange state, matching the live page.
 * - Unlike the homepage, this page's sections are capped at a fixed 1200px inner
 *   width rather than the fluid 75% `.dsg-container`; that wrapper lives inside
 *   `ContactPage`.
 * - There is no spacer between the header and the hero here — the hero carries its
 *   own `padding-top: 80px`.
 */
export const metadata: Metadata = {
  title: "Contact us | DESIGNALLY",
  alternates: { canonical: "https://designally.co/contact-us/" },
};

export default function ContactUsPage() {
  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/contact-us/" />

      <SiteHeader activeNav="/contact-us/" />

      <main className="flex flex-col">
        <ContactPage />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
