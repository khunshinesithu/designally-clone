/**
 * Sanity Studio route.
 *
 * The Studio is a client-side single-page app, so this route opts out of static
 * generation. It is the only non-static route in the site; the six content
 * pages still prerender.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
