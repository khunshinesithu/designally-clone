import "server-only";

import type { DsgWorkCategory } from "@/types/designally";

import { isSanityConfigured } from "../env";
import caseStudyDetails from "../case-study-details.json";
import seed from "../seed-data.json";
import { client, REVALIDATE_SECONDS } from "./client";
import { dimensions, urlFor } from "./image";
import {
  ALL_CASE_STUDIES_QUERY,
  CASE_STUDY_DETAIL_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  ALL_WORK_ITEMS_QUERY,
  HOME_CASE_STUDIES_QUERY,
  HOME_WORK_ITEMS_QUERY,
  POSTS_QUERY,
  SERVICES_QUERY,
} from "./queries";

/**
 * The one place the pages get content from.
 *
 * Every function returns a plain, render-ready shape — notably `imageUrl` as a
 * string rather than a Sanity image object, so components never care where the
 * content came from.
 *
 * When Sanity is configured the data comes from the dataset. When it is not,
 * these fall back to `seed-data.json`, which is the same content extracted from
 * the original hardcoded arrays. That matters for two reasons: the repository
 * builds and CI passes before anyone has created a Sanity project, and the site
 * keeps working if the API is briefly unreachable at build time.
 */

/** Whether content is coming from Sanity rather than the seed. */
export const usingSanity = isSanityConfigured;

type SanityImage = Parameters<typeof urlFor>[0];

const fetchOptions = { next: { revalidate: REVALIDATE_SECONDS } } as const;

/** Run a GROQ query, falling back to the seed if Sanity is unset or unreachable. */
async function query<T>(q: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await client.fetch<T>(q, params, fetchOptions);
    // An empty dataset should not blank the site — treat it as "not migrated yet".
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch (error) {
    console.warn(
      `[sanity] query failed, falling back to seed-data.json: ${(error as Error).message}`,
    );
    return fallback;
  }
}

function imageUrl(image: SanityImage | undefined, width: number): string | null {
  if (!image) return null;
  return urlFor(image).width(width).url();
}

// --- work items -------------------------------------------------------------

export interface WorkItemView {
  id: string;
  imageUrl: string;
  alt: string;
  categories: DsgWorkCategory[];
}

const WORK_CATEGORIES: readonly DsgWorkCategory[] = [
  "logo-design",
  "packaging",
  "brand-ci",
  "website",
  "social-media",
];

/**
 * Keep only categories the gallery filter knows about. An editor could save a
 * value the UI has no filter for; dropping it is better than rendering a tile
 * that no filter can reach or crashing the narrow.
 */
function toCategories(values: readonly string[] | undefined): DsgWorkCategory[] {
  return (values ?? []).filter((v): v is DsgWorkCategory =>
    (WORK_CATEGORIES as readonly string[]).includes(v),
  );
}

type WorkItemDoc = { id: string; image: SanityImage; alt?: string; categories?: string[] };

function seedWorkItems(homeOnly: boolean): WorkItemView[] {
  return seed.workItems
    .filter((w) => (homeOnly ? w.showOnHome : true))
    .map((w) => ({
      id: w.file,
      imageUrl: w.localPath,
      alt: w.alt ?? "",
      categories: toCategories(w.categories),
    }));
}

/** Gallery tiles. `homeOnly` returns the subset the homepage renders. */
export async function getWorkItems(homeOnly: boolean): Promise<WorkItemView[]> {
  const docs = await query<WorkItemDoc[]>(
    homeOnly ? HOME_WORK_ITEMS_QUERY : ALL_WORK_ITEMS_QUERY,
    {},
    [],
  );
  if (docs.length === 0) return seedWorkItems(homeOnly);
  return docs.map((d) => ({
    id: d.id,
    imageUrl: imageUrl(d.image, 600) ?? "",
    alt: d.alt ?? "",
    categories: toCategories(d.categories),
  }));
}

// --- case studies -----------------------------------------------------------

export interface CaseStudyView {
  id: string;
  client: string;
  meta: string;
  href: string;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
}

type CaseStudyDoc = {
  id: string;
  client: string;
  industry: string;
  services: string;
  href: string;
  image: SanityImage;
  alt?: string;
};

/**
 * The stored href is the original absolute URL. The clone has its own
 * /works/<slug>/ pages now, so point the cards at those instead of sending
 * visitors back to the live site.
 */
function internalHref(href: string): string {
  const m = /\/works\/([^/?#]+)/.exec(href ?? "");
  return m ? `/works/${m[1]}/` : href;
}

function seedCaseStudies(homeOnly: boolean): CaseStudyView[] {
  return seed.caseStudies
    .filter((c) => (homeOnly ? c.showOnHome : true))
    .map((c) => ({
      id: c.client,
      client: c.client,
      meta: [c.industry, c.services].filter(Boolean).join(" / "),
      href: internalHref(c.href),
      imageUrl: c.localPath,
      alt: c.alt ?? "",
      width: c.width,
      height: c.height,
    }));
}

export async function getCaseStudies(homeOnly: boolean): Promise<CaseStudyView[]> {
  const docs = await query<CaseStudyDoc[]>(
    homeOnly ? HOME_CASE_STUDIES_QUERY : ALL_CASE_STUDIES_QUERY,
    {},
    [],
  );
  if (docs.length === 0) return seedCaseStudies(homeOnly);
  return docs.map((d) => ({
    id: d.id,
    client: d.client,
    meta: [d.industry, d.services].filter(Boolean).join(" / "),
    href: internalHref(d.href),
    imageUrl: imageUrl(d.image, 1200) ?? "",
    alt: d.alt ?? "",
    ...(dimensions(d.image) ?? { width: 800, height: 450 }),
  }));
}

// --- services ---------------------------------------------------------------

export interface ServiceView {
  id: string;
  eyebrow: string;
  title: string;
  /** Index of the letter set in italic, or null. */
  italicLetter: number | null;
  description: string;
  tags: string[];
  anchorId: string | null;
  imageUrl: string;
  alt: string;
}

type ServiceDoc = {
  id: string;
  eyebrow: string;
  title: string;
  italicLetter?: number;
  description: string;
  tags?: string[];
  anchorId?: string;
  image: SanityImage;
  alt?: string;
};

function seedServices(page: "home" | "services"): ServiceView[] {
  return seed.services
    .filter((s) => s.page === page)
    .map((s) => ({
      id: `${s.page}-${s.title}`,
      eyebrow: s.eyebrow,
      title: s.title,
      italicLetter: (s as { italicLetter?: number | null }).italicLetter ?? null,
      description: s.description,
      tags: s.tags ?? [],
      anchorId: s.anchorId ?? null,
      imageUrl: s.localPath,
      alt: s.alt ?? "",
    }));
}

export async function getServices(page: "home" | "services"): Promise<ServiceView[]> {
  const docs = await query<ServiceDoc[]>(SERVICES_QUERY, { page }, []);
  if (docs.length === 0) return seedServices(page);
  return docs.map((d) => ({
    id: d.id,
    eyebrow: d.eyebrow,
    title: d.title,
    italicLetter: d.italicLetter ?? null,
    description: d.description,
    tags: d.tags ?? [],
    anchorId: d.anchorId ?? null,
    imageUrl: imageUrl(d.image, 1080) ?? "",
    alt: d.alt ?? "",
  }));
}

// --- posts ------------------------------------------------------------------

export interface PostView {
  id: string;
  title: string;
  href: string;
  categories: string;
  date: string;
  imageUrl: string;
  alt: string;
  /** Intrinsic size — the listing card's height derives from this aspect ratio. */
  width: number;
  height: number;
}

type PostDoc = {
  id: string;
  title: string;
  href: string;
  categories: string;
  date: string;
  image: SanityImage;
  alt?: string;
};

function seedPosts(): PostView[] {
  return seed.posts.map((p) => ({
    id: p.title,
    title: p.title,
    href: p.href,
    categories: p.categories,
    date: p.date,
    imageUrl: p.localPath,
    alt: p.alt ?? "",
    width: p.width,
    height: p.height,
  }));
}

export async function getPosts(): Promise<PostView[]> {
  const docs = await query<PostDoc[]>(POSTS_QUERY, {}, []);
  if (docs.length === 0) return seedPosts();
  return docs.map((d) => ({
    id: d.id,
    title: d.title,
    href: d.href,
    categories: d.categories,
    date: d.date,
    imageUrl: imageUrl(d.image, 1200) ?? "",
    alt: d.alt ?? "",
    ...(dimensions(d.image) ?? { width: 1536, height: 904 }),
  }));
}

// --- case-study detail pages -------------------------------------------------

export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** One full-bleed block: a row of images, or a looping video. */
export type CaseStudyBlock =
  | { kind: "row"; images: CaseStudyImage[] }
  | { kind: "video"; src: string; width: number; height: number };

export interface CaseStudyDetailView {
  slug: string;
  client: string;
  title: string;
  metaTitle: string;
  metaDescription: string | null;
  heroVideoUrl: string | null;
  body: string[];
  visitLabel: string | null;
  visitHref: string | null;
  industry: string | null;
  services: string | null;
  duration: string | null;
  tags: string[];
  gallery: CaseStudyBlock[];
  nextUp: { slug: string; client: string; image: CaseStudyImage | null } | null;
}

type SeedDetail = (typeof caseStudyDetails)[number];

/** Widen the JSON import's inferred literal/optional types to the view shape. */
function fromSeed(d: SeedDetail): CaseStudyDetailView {
  const img = (i: { localPath: string; alt: string; width: number; height: number }) => ({
    src: i.localPath,
    alt: i.alt,
    width: i.width,
    height: i.height,
  });
  return {
    slug: d.slug,
    client: d.client,
    title: d.title,
    metaTitle: d.metaTitle,
    metaDescription: d.metaDescription,
    heroVideoUrl: d.heroVideoUrl,
    body: d.body,
    visitLabel: d.visitLabel,
    visitHref: d.visitHref,
    industry: d.industry,
    services: d.services,
    duration: d.duration,
    tags: d.tags,
    // The JSON import widens the two block shapes into one union, so each
    // field has to be narrowed back rather than trusted.
    gallery: d.gallery.flatMap<CaseStudyBlock>((b) =>
      b.kind === "video"
        ? b.localPath
          ? [{ kind: "video", src: b.localPath, width: b.width ?? 0, height: b.height ?? 0 }]
          : []
        : [{ kind: "row", images: (b.images ?? []).map(img) }],
    ),
    nextUp: d.nextUpSlug
      ? {
          slug: d.nextUpSlug,
          client: d.nextUpClient,
          image: d.nextUpImage ? img(d.nextUpImage) : null,
        }
      : null,
  };
}

/** Every detail-page slug, for `generateStaticParams`. */
export async function getCaseStudySlugs(): Promise<string[]> {
  const slugs = await query<string[]>(CASE_STUDY_SLUGS_QUERY, {}, []);
  if (slugs.length === 0) return caseStudyDetails.map((d) => d.slug);
  return slugs;
}

type DetailDoc = {
  client: string;
  title: string;
  industry?: string;
  services?: string;
  duration?: string;
  heroVideoUrl?: string;
  body?: string[];
  visitLabel?: string;
  visitHref?: string;
  tags?: string[];
  gallery?: Array<{
    _type: string;
    images?: Array<SanityImage & { alt?: string }>;
    file?: { asset?: { _ref?: string } };
    width?: number;
    height?: number;
  }>;
  nextUpImage?: SanityImage;
  nextUp?: { client: string; slug: string };
};

/** A Sanity file asset id encodes its extension: file-<sha>-<ext>. */
function fileUrl(ref: string | undefined): string | null {
  const m = /^file-([a-f0-9]+)-(\w+)$/.exec(ref ?? "");
  if (!m) return null;
  const { projectId, dataset } = { projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET };
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${m[1]}.${m[2]}`;
}

export async function getCaseStudy(slug: string): Promise<CaseStudyDetailView | null> {
  const seeded = caseStudyDetails.find((d) => d.slug === slug);
  const doc = await query<DetailDoc | null>(CASE_STUDY_DETAIL_QUERY, { slug }, null);
  if (!doc) return seeded ? fromSeed(seeded) : null;

  const toImage = (i: SanityImage & { alt?: string }): CaseStudyImage => ({
    src: imageUrl(i, 1600) ?? "",
    alt: i.alt ?? "",
    ...(dimensions(i) ?? { width: 1440, height: 1440 }),
  });

  return {
    slug,
    client: doc.client,
    title: doc.title,
    // Metadata is not editable in the Studio; keep the original's wording.
    metaTitle: seeded?.metaTitle ?? doc.title,
    metaDescription: seeded?.metaDescription ?? null,
    heroVideoUrl: doc.heroVideoUrl ?? null,
    body: doc.body ?? [],
    visitLabel: doc.visitLabel ?? null,
    visitHref: doc.visitHref ?? null,
    industry: doc.industry ?? null,
    services: doc.services ?? null,
    duration: doc.duration ?? null,
    tags: doc.tags ?? [],
    gallery: (doc.gallery ?? []).flatMap<CaseStudyBlock>((b) => {
      if (b._type === "galleryVideo") {
        const src = fileUrl(b.file?.asset?._ref);
        return src ? [{ kind: "video", src, width: b.width ?? 0, height: b.height ?? 0 }] : [];
      }
      const images = (b.images ?? []).map(toImage);
      return images.length ? [{ kind: "row", images }] : [];
    }),
    nextUp: doc.nextUp
      ? {
          slug: doc.nextUp.slug,
          client: doc.nextUp.client,
          image: doc.nextUpImage
            ? { ...toImage(doc.nextUpImage), alt: `${doc.nextUp.client} project` }
            : null,
        }
      : null,
  };
}
