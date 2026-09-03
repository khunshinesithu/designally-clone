import Image from "next/image";
import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/sites/designally-co-e422ade5/shared/icons";
import { cn } from "@/lib/utils";

/**
 * designally.co — /thoughts/ (blog listing). Site key designally-co-e422ade5,
 * page key thoughts-e2a689e8.
 *
 * Two live sections: the masthead `.elementor-element-fd79586` (368px) and the
 * post listing `.elementor-element-5d0e1c1` (3646px). Every number below is
 * `getComputedStyle` / `getBoundingClientRect` output captured at 1440x900 and
 * recorded in `docs/research/designally-co-e422ade5/thoughts-e2a689e8/
 * extract-thoughts.json` + `extract-thoughts-2.json`.
 *
 * Container: this page does NOT use the homepage's fluid `.dsg-container`
 * (max-width 75%). Both sections are a fixed **1200px centred** column — the
 * measured content starts at x=113 in a 1425px viewport, i.e. (1425-1200)/2.
 * Below 1248px it keeps a 24px gutter on each side; only 1440 was measured, so
 * that gutter is a judgement call.
 *
 * Nothing on this page is interactive: the category tabs are ordinary links to
 * WordPress category archives (NOT client-side filters) and each card is a
 * single link. Server components throughout — no state, no effects.
 */

/** One row of the listing, in live DOM order. */
export interface ThoughtPost {
  /** Post title — Poppins 32px/38.4px, 500, rgb(33,33,33). */
  title: string;
  /**
   * Absolute link to the live article. The individual posts are not part of
   * this clone, so a relative href would 404 — these deliberately leave the
   * clone, unlike the header nav.
   */
  href: string;
  /**
   * Comma-joined category list exactly as WordPress renders it. The live markup
   * splits it into one `<a>` per term separated by ", "; the joined string
   * lands on the same measured box (post 2 = 329px wide) with far less markup.
   */
  categories: string;
  /**
   * Publish date as rendered — **Thai** (WPML), e.g. "กรกฎาคม 17, 2024".
   * Verbatim from the live DOM: do not translate, localise or reformat.
   */
  date: string;
  /** Thumbnail under `public/`. Rendered 560px wide, `border-radius: 8px`. */
  src: string;
  /** Intrinsic pixel size of the file on disk — drives the card height. */
  width: number;
  height: number;
  /** Live `alt`. Empty on eight of nine: the card's title already names it. */
  alt: string;
}

const IMAGE_BASE = "/sites/designally-co-e422ade5/thoughts-e2a689e8/images";

/**
 * The nine posts, in live order.
 *
 * The card height is not hard-coded — it falls out of the thumbnail's aspect
 * ratio at 560px wide, which reproduces the measured 330 / 400 / 293 / 345 /
 * 345 / 345 / 345 / 370 / 370 exactly. (Cards 7 and 8 measured 194px in the
 * extraction only because their lazy-loaded images were still 1x1 placeholders
 * when the snapshot was taken; 194.195px is the natural height of the text
 * column alone, which is what pins the spacing model below.)
 */
export const THOUGHT_POSTS: readonly ThoughtPost[] = [
  {
    title:
      "Elevate Your Brand with Effective Packaging Design: Insights and Best Practices",
    href: "/thoughts/elevate-your-brand-with-effective-packaging-design-insights-and-best-practices/",
    categories: "Knowledge",
    date: "กรกฎาคม 17, 2024",
    src: `${IMAGE_BASE}/Albotroos-packaging-design-by-Designally-design-agency-bangkok-2-1536x904.jpg`,
    width: 1536,
    height: 904,
    alt: "",
  },
  {
    title: "Developing a Strong Brand Identity",
    href: "/thoughts/developing-a-strong-brand-identity/",
    categories: "Knowledge, Tips, Uncategorized @th",
    date: "มิถุนายน 10, 2024",
    src: `${IMAGE_BASE}/strong_brand_identity_cover-1536x1097.jpg`,
    width: 1536,
    height: 1097,
    alt: "",
  },
  {
    title: "Annual Brand Health Check: Preparing for Success in 2024",
    href: "/thoughts/annual-brand-health-check-preparing-for-success-in-2024/",
    categories: "Tips",
    date: "พฤศจิกายน 14, 2023",
    src: `${IMAGE_BASE}/Content_1_Shared-Image-1536x804.webp`,
    width: 1536,
    height: 804,
    alt: "How healthy is your brand?",
  },
  {
    title:
      "The Art and Science of Naming: Crafting a Brand Identity Through Words",
    href: "/thoughts/the-art-and-science-of-naming-crafting-a-brand-identity-through-words/",
    categories: "Tips",
    date: "สิงหาคม 23, 2023",
    src: `${IMAGE_BASE}/5.0-1536x946.png`,
    width: 1536,
    height: 946,
    alt: "",
  },
  {
    title:
      "Exploring Brand Archetypes: Unveiling the Personality Behind Your Brand",
    href: "/thoughts/exploring-brand-archetypes-unveiling-the-personality-behind-your-brand/",
    categories: "Knowledge",
    date: "สิงหาคม 23, 2023",
    src: `${IMAGE_BASE}/4.0-1536x946.png`,
    width: 1536,
    height: 946,
    alt: "",
  },
  {
    title: "Designing E-Commerce Websites: Strategies for Driving Sales",
    href: "/thoughts/designing-e-commerce-websites-strategies-for-driving-sales/",
    categories: "Tips",
    date: "สิงหาคม 23, 2023",
    src: `${IMAGE_BASE}/3-1536x946.png`,
    width: 1536,
    height: 946,
    alt: "",
  },
  {
    title: "The Basic Fundamentals of Graphic Design",
    href: "/thoughts/the-basic-fundamentals-of-graphic-design/",
    categories: "Tips",
    date: "สิงหาคม 23, 2023",
    src: `${IMAGE_BASE}/The-Basic-Fundamentals-of-Graphic-Design_feature-1536x946.jpg`,
    width: 1536,
    height: 946,
    alt: "",
  },
  {
    title: "The Art of Consistent Branding: A Comprehensive Guide",
    href: "/thoughts/the-art-of-consistent-branding-a-comprehensive-guide/",
    categories: "Knowledge",
    date: "กรกฎาคม 11, 2023",
    src: `${IMAGE_BASE}/Frame-942-1536x1015.png`,
    width: 1536,
    height: 1015,
    alt: "",
  },
  {
    title:
      "The Power of Online Brand Guidelines: Streamlining Your Brand Identity",
    href: "/thoughts/the-power-of-online-brand-guidelines-streamlining-your-brand-identity/",
    categories: "Knowledge",
    date: "กรกฎาคม 11, 2023",
    src: `${IMAGE_BASE}/Frame-9421-1536x1015.png`,
    width: 1536,
    height: 1015,
    alt: "",
  },
];

/**
 * Fixed 1200px centred column, unlike the homepage's fluid `.dsg-container`.
 * `min()` keeps it exactly 1200px from 1248px up and gives a 24px gutter below,
 * so the measured 112.5px side margin at 1425px is reproduced precisely.
 */
const CONTAINER = "mx-auto w-[min(1200px,calc(100%-48px))]";

/**
 * Category tabs.
 *
 * These are links to WordPress category archives, not in-page filters — there
 * is no filter state anywhere in this file. `All` is this very page, so it is
 * relative; the two archives are outside the clone's scope, so they stay
 * absolute to the live site (the live DOM has them as `/thoughts/knowledge/`
 * and `/thoughts/tips/`, which would 404 here).
 */
/**
 * The category tabs. `/thoughts/knowledge/` and `/thoughts/tips/` are the same
 * listing filtered, with the matching tab in orange — the active state is the
 * only difference between the three pages.
 */
export type ThoughtsCategory = "all" | "knowledge" | "tips";

const TABS: readonly { label: string; href: string; key: ThoughtsCategory }[] = [
  { label: "All", href: "/thoughts/", key: "all" },
  { label: "Knowledge", href: "/thoughts/knowledge/", key: "knowledge" },
  { label: "Tips", href: "/thoughts/tips/", key: "tips" },
];

/** EB Garamond 500 for both the wordmark and the tabs. */
const DISPLAY_TYPE = "font-serif font-medium";

/**
 * Masthead `fd79586` — 368px tall: 80px of top padding, the 102px wordmark, and
 * 186px below it (80 + 102 + 186 = 368).
 *
 * The wordmark and the tab row are **baseline aligned**, not centred: the
 * wordmark box sits at y=212 and the 64px tabs at y=243, a 31px offset that
 * falls out exactly when the two share a baseline at EB Garamond's ~0.972em
 * ascent. The tab row is flush with the container's right edge (Tips ends at
 * x=1312 = 113 + 1200 - 1).
 *
 * Only 1440 was measured. Below 1025px the wordmark steps 102 -> 72 -> 56px and
 * the tabs 64 -> 40 -> 32px, and below 768px the tabs wrap under the wordmark —
 * those three steps are scaling choices, not measurements.
 */
function ThoughtsMasthead({ activeCategory }: { activeCategory: ThoughtsCategory }) {
  return (
    <section className="w-full pt-[48px] pb-[64px] tab:pt-[64px] tab:pb-[120px] desk:pt-[80px] desk:pb-[186px]">
      <div
        className={cn(
          CONTAINER,
          "flex flex-col gap-[24px] tab:flex-row tab:items-baseline tab:justify-between tab:gap-[40px]",
        )}
      >
        {/*
          Three runs on one baseline — and the middle one is WHITE on a white
          page, so the word reads as "T oughts" with a hole in it. That is the
          live design (the same trick as the italic I in "OUR SERVICES"), not a
          contrast bug: do not darken it. The live markup is three separate H1
          widgets; one H1 with three spans is the same pixels with a sane
          document outline, and screen readers still announce "Thoughts".
        */}
        <h1
          className={cn(
            DISPLAY_TYPE,
            "m-0 text-[56px] leading-[56px] tab:text-[72px] tab:leading-[72px] desk:text-[102px] desk:leading-[102px]",
          )}
        >
          <span className="text-dsg-ink-strong">T</span>
          <span className="text-white">h</span>
          <span className="text-dsg-ink-strong">oughts</span>
        </h1>

        <nav
          aria-label="Thoughts categories"
          className={cn(
            DISPLAY_TYPE,
            "flex flex-wrap items-baseline gap-x-[20px] gap-y-[8px] text-[32px] leading-[32px]",
            "tab:gap-x-[25px] tab:text-[40px] tab:leading-[40px]",
            "desk:gap-x-[40px] desk:text-[64px] desk:leading-[64px]",
          )}
        >
          {TABS.map((tab) => {
            const active = tab.key === activeCategory;
            // The live site renders the current category as plain text, not a
            // link — measured on /thoughts/tips/, where only "All" and
            // "Knowledge" are anchors. A link to the page you are already on
            // is a no-op anyway.
            return active ? (
              <span
                key={tab.label}
                aria-current="page"
                className="text-dsg-orange"
              >
                {tab.label}
              </span>
            ) : (
              <Link
                key={tab.label}
                href={tab.href}
                className="text-dsg-ink-strong transition-colors duration-300 hover:text-dsg-orange"
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

/**
 * One post row — 1200 x (thumbnail height), `flex-direction: row; gap: 80px`,
 * two 560px columns.
 *
 * The left column's vertical model is confirmed against the 194.195px natural
 * height measured on the two cards whose thumbnails had not loaded:
 *
 *   title 76.8 + 24 + meta 23.4 + 20 (min gap) + 8 + "Read more" 26 + 16 = 194.2
 *
 * so "Read more" is bottom-anchored with a 20px minimum clearance. The flexible
 * spacer below does both jobs: it grows to push "Read more" onto the card's
 * bottom edge when the thumbnail is the taller column, and never collapses past
 * 20px when the text column is.
 *
 * Below 768px the row becomes a column with the thumbnail BELOW the text, which
 * keeps DOM order and visual order identical. The 24px stack gap is a choice —
 * only the 1440 layout was measured.
 */
function ThoughtCard({ post }: { post: ThoughtPost }) {
  return (
    <article className="w-full">
      <Link
        href={post.href}
        className="group flex w-full flex-col gap-[24px] tab:flex-row tab:gap-[80px]"
      >
        <div className="flex min-w-0 flex-col tab:flex-1">
          {/* Live tag is H1; H2 keeps the page to a single H1 ("Thoughts"). */}
          <h2 className="m-0 font-sans text-[32px] leading-[38.4px] font-medium text-dsg-ink-strong transition-colors duration-300 group-hover:text-dsg-orange">
            {post.title}
          </h2>

          {/* Meta row: categories 500 then date 400, both 18px/23.4px, 15px
              apart (measured 15.2px between the two boxes on every card). */}
          <div className="mt-[24px] flex flex-wrap items-baseline gap-x-[15px] gap-y-[4px] font-sans text-[18px] leading-[23.4px] text-dsg-ink-strong">
            <span className="font-medium">{post.categories}</span>
            <span className="font-normal">{post.date}</span>
          </div>

          <div aria-hidden="true" className="min-h-[20px] grow" />

          {/* `margin: 8px 0 16px` and the 24px arrow's `margin-bottom: -5px`
              are both measured. The 8px before the arrow is derived from the
              live block width (142px = "Read more" + 8px + a 24px arrow) and
              verified back at 142px in the browser. The arrow is the shared
              ArrowUpRightIcon — the live `up_right_arrow.svg` is byte-identical
              to it, so no new asset is needed. */}
          <span className="mt-[8px] mb-[16px] w-fit font-sans text-[20px] leading-[26px] font-medium text-dsg-orange">
            Read more
            <ArrowUpRightIcon className="mb-[-5px] ml-[8px] inline-block h-[24px] w-[24px]" />
          </span>
        </div>

        <div className="min-w-0 tab:flex-1">
          <Image
            src={post.src}
            alt={post.alt}
            width={post.width}
            height={post.height}
            sizes="(min-width: 1248px) 560px, (min-width: 768px) 45vw, calc(100vw - 48px)"
            className="h-auto w-full rounded-[8px]"
          />
        </div>
      </Link>
    </article>
  );
}

/**
 * Listing `5d0e1c1` — the nine cards stacked with an 80px gap (measured between
 * every consecutive pair) and 190px of trailing padding before the orange CTA.
 */
function ThoughtsListing({ posts }: { posts: readonly ThoughtPost[] }) {
  return (
    <section className="w-full pb-[96px] desk:pb-[190px]">
      <div
        className={cn(CONTAINER, "flex flex-col gap-[48px] desk:gap-[80px]")}
      >
        {posts.map((post) => (
          <ThoughtCard key={post.href} post={post} />
        ))}
      </div>
    </section>
  );
}

/** Masthead + listing. The header, CTA and footer are added by the route. */
export interface ThoughtsPageProps {
  /**
   * Listing entries. Supplied by the route, which reads them from Sanity and
   * falls back to the seed when the CMS is not configured. Defaults to the
   * original hardcoded set so the component still renders standalone.
   */
  posts?: readonly ThoughtPost[];
  /** Which category tab is highlighted. */
  activeCategory?: ThoughtsCategory;
}

export function ThoughtsPage({
  posts = THOUGHT_POSTS,
  activeCategory = "all",
}: ThoughtsPageProps) {
  return (
    <>
      <ThoughtsMasthead activeCategory={activeCategory} />
      <ThoughtsListing posts={posts} />
    </>
  );
}
