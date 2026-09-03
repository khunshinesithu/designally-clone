import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Read-only client used by the pages.
 *
 * `useCdn: true` serves from Sanity's edge cache. Content is fetched at build
 * time and revalidated on an interval, so the site stays statically rendered —
 * exactly as it was before the CMS.
 */
export const client = createClient({
  // Placeholders keep `createClient` from throwing at import time when Sanity is
  // unconfigured. Nothing ever queries through it in that state — `content.ts`
  // checks `isSanityConfigured` before it fetches.
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** How often a page rechecks Sanity, in seconds. One hour suits a brochure site. */
export const REVALIDATE_SECONDS = 3600;
