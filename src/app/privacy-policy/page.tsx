import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  LegalPage,
  type LegalPageData,
} from "@/components/sites/designally-co-e422ade5/legal-e8d1e5c9/LegalPage";
import legalPages from "@/content/legal-pages.json";

/**
 * Clone of https://designally.co/privacy-policy/.
 *
 * The copy is static legal text in Thai, so it ships as data in the repository
 * rather than going into Sanity — the CMS holds the content that actually
 * changes. Regenerate with `node scripts/extract-legal.mjs`.
 */

const page = (legalPages as LegalPageData[]).find((p) => p.slug === "privacy-policy");

export const metadata: Metadata = {
  title: "Privacy Policy | DESIGNALLY",
  alternates: { canonical: "https://designally.co/privacy-policy/" },
};

export default function PrivacyPolicy() {
  if (!page) notFound();
  return <LegalPage page={page} />;
}
