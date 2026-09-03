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

/** Slugs for generateStaticParams on /works/<slug>/. */
export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)].slug.current
`);

/**
 * One case-study detail page. `nextUp->` dereferences the linked project so the
 * footer link needs no second round trip, and brings back its cover as the
 * fallback banner: `nextUpImage` overrides it where a project has a dedicated
 * one, and an empty banner falls back to the linked project's own image.
 */
export const CASE_STUDY_DETAIL_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    "id": _id, client, title, industry, services, duration,
    heroVideoUrl, body, visitLabel, visitHref, tags,
    gallery[] {
      _type,
      _type == "galleryRow" => { images[] { ..., alt } },
      _type == "galleryVideo" => { file, width, height }
    },
    nextUpImage,
    nextUp-> { client, "slug": slug.current, image, alt }
  }
`);

/** Slugs for generateStaticParams on /thoughts/<slug>/. */
export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);

/**
 * One article. `related->` brings back the linked post's own card image, which
 * is what the "Next up" block at the foot of the article shows.
 */
export const POST_DETAIL_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    "id": _id, title, categories, date, image, alt, body,
    related-> { title, "slug": slug.current, image, alt }
  }
`);
