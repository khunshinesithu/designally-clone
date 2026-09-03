import { defineQuery } from "next-sanity";

/**
 * GROQ queries, one per surface.
 *
 * Two of these exist as pairs — the homepage shows a subset of what /works/
 * shows — which is exactly the duplication the CMS removes. Both read the same
 * collection and differ only by the `showOnHome` filter.
 */

/** Homepage gallery — the subset flagged for the homepage. */
export const HOME_WORK_ITEMS_QUERY = defineQuery(`
  *[_type == "workItem" && showOnHome == true] | order(order asc) {
    "id": _id, image, alt, categories
  }
`);

/** /works/ gallery — every tile. */
export const ALL_WORK_ITEMS_QUERY = defineQuery(`
  *[_type == "workItem"] | order(order asc) {
    "id": _id, image, alt, categories
  }
`);

/** Homepage case studies — four of the six. */
export const HOME_CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && showOnHome == true] | order(order asc) {
    "id": _id, client, industry, services, href, image, alt
  }
`);

/** /works/ case studies — all of them. */
export const ALL_CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(order asc) {
    "id": _id, client, industry, services, href, image, alt
  }
`);

/** Service cards for one page — "home" or "services". */
export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && page == $page] | order(order asc) {
    "id": _id, eyebrow, title, italicLetter, description, tags, anchorId, image, alt
  }
`);

/** /thoughts/ listing. */
export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(order asc) {
    "id": _id, title, href, categories, date, image, alt
  }
`);
