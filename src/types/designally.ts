/**
 * Content types for the designally.co (/) clone.
 * Site key: designally-co-e422ade5 · Page key: root-8a5edab2
 *
 * These mirror the content structures observed on the live page. They are
 * namespaced to this site so a later clone can define its own without conflict.
 */

/** A nav entry in either header. */
export interface DsgNavItem {
  label: string;
  href: string;
}

/** One slide of the hero video showcase. */
export interface DsgHeroSlide {
  /** Client name shown in the label row beneath the video. */
  client: string;
  /** Local path under /sites/designally-co-e422ade5/root-8a5edab2/videos/. */
  videoSrc: string;
}

/** A pill tag inside a service card ("Naming", "Brand Story", …). */
export type DsgServiceTag = string;

/** One of the five cards in the right column of the Services section. */
export interface DsgServiceCard {
  /** Anchor id consumed by the sticky panel links — e.g. "Branding". */
  anchorId?: string;
  /** Small label above the title: "BRANDING", "WEBSITE", "Your Design Ally". */
  eyebrow: string;
  title: string;
  description: string;
  tags: DsgServiceTag[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

/** A numbered row in the sticky Services panel. */
export interface DsgServiceNavRow {
  /** Zero-padded index as rendered: "01", "02", … */
  number: string;
  label: string;
  href: string;
}

/** Filter categories of the works gallery, matching the live `data-filter` values. */
export type DsgWorkCategory =
  | "logo-design"
  | "packaging"
  | "brand-ci"
  | "website"
  | "social-media";

/** One tile in the works gallery. */
export interface DsgWorkItem {
  /** Local image path; absent for the two source items that carry no <img>. */
  src?: string;
  alt: string;
  /** An item may belong to more than one category — 8 of the 58 do. */
  categories: DsgWorkCategory[];
  /** Full-size upload the tile links to. */
  href?: string;
}

/** A filter button in the works gallery bar. */
export interface DsgWorkFilter {
  label: string;
  /** `null` represents the "All projects" filter. */
  category: DsgWorkCategory | null;
}

/** One of the four cards in the Case Study grid. */
export interface DsgCaseStudy {
  client: string;
  /** Meta line, e.g. "Industrial & Manufacturing / Branding / Website". */
  meta: string;
  href: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}
