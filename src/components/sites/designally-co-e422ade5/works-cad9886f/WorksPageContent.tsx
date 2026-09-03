"use client";

/**
 * designally.co /works/ — masthead (`aa96562`) + the 76-item gallery (`13a2e40`).
 *
 * The gallery is the same Premium Addons `premium-img-gallery` widget the homepage
 * runs (see root-8a5edab2/WorksGallery.tsx), isotope in `fitRows` mode with the
 * `zoomin` hover skin, reproduced here as a plain CSS grid + React state. Same
 * behaviour, different sizing and a longer item list — this file deliberately does
 * NOT import from the homepage component so that verified page cannot regress.
 *
 * Layout maths at the measured 1425px viewport (see extract-works-page.json):
 *   container   = 1200px centred, content starts at x=113
 *   grid        = 1200 x 900 at y=539 → 4 x 300px tiles, 3 rows visible on load
 *   tile        = 300 x 300, padding 8px → 284px image frame, 16px radius
 *   masthead    = 102px EB Garamond at y=212, illustration 377 x 258 at x=893/y=162
 *
 * The whole file is a client module because of the gallery's filter/reveal state;
 * the masthead itself is static markup and holds no state. That is also why the
 * page container and the six case studies live in `src/app/works/page.tsx`
 * instead: a server component reading a constant exported from a "use client"
 * module gets a client reference, not the value.
 *
 * Every value below is `getComputedStyle` output from the live site at 1440x900.
 */

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type {
  DsgWorkCategory,
  DsgWorkFilter,
  DsgWorkItem,
} from "@/types/designally";

/** Shared with the homepage — same file, rendered 377 x 258 here instead of 349 x 239. */
const ILLUSTRATION_SRC =
  "/sites/designally-co-e422ade5/shared/svg/works-illustration.svg";

/**
 * The 74 renderable tiles, in live DOM order. The widget holds 76 items; items
 * 25 and 27 (both `website`) carry no `<img>` at all and are therefore absent,
 * which is why the "Website" filter shows 6 tiles rather than the 8 the live
 * filter bar counts. Every `src` below exists under public/.
 */
export const WORK_ITEMS: DsgWorkItem[] = [
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Charmy_IG_Designally-Post_2-2-scaled.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Logo-design-foodie.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Logo-design-tattva.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Logo-design-sofresh.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Logo-design-sook-sabai-spa.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Logo-design-De-Vineri.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Logo-design-Utopia-group.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Logo-design-Success-group.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Pet-Party-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Nanobag-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Rak-Mao-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/PEA-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Thai-Gem-Center_IG-Post_Post_3-2-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/ThaiGem_IG-Post_edit.jpg", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/ThaiGem_IG-Post_Post_5-1-e1697706345846.png", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Thai-Gem-Center_IG-Post_Post_3-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Seacon-Pro-_IG-Post-03-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Seacon-Pro-_IG-Post-02-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Seacon-Pro-_IG-Post-09-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Seacon-Pro-_IG-Post-08-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/insight-ERA_2-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/insight-ERA_3-2.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/insight-ERA_1-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/insight-ERA_1-2-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Pomelo-Career-web-search-scaled.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Pomelo-Career-web-linked-in-scaled.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Mjets-website-mockup-scaled-e1697708818477.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Mjets-website-mockup-1-scaled-e1697708999896.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-websiteHuawei-1.webp", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-websiteHuawei-2.webp", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/UNK-2023-Poster_SQ.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/UNK-Gathering-Poster_SQ.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/72653360_2434651543239312_6881135772582281216_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/69078711_2335796459791488_7838476904754577408_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/68273449_2310893275615140_2687913807988129792_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/72427118_2432596203444846_836697455037775872_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/347781850_6051770704949177_5622929737336053476_n-scaled.jpg", alt: "A futuristic gaming style graphic design of key features of the Bitazza cryptocurrency trading platform, designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/362920442_217355491291134_2956835042896295031_n.jpg", alt: "The online banner depicts an individual grasping a mobile phone, showcasing the user interface of Freedom Card. The interface displays the upgrade card stage, accompanied by a hand clasping a pink Freedom Card in close proximity.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/350535470_979839496781451_4827950317788281151_n-scaled.jpg", alt: "The infographic showcasing Bitazza's platform key features was expertly crafted by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/344592478_942011020175548_2643397633021433264_n-scaled.jpg", alt: "A futuristic gaming style graphic design of key features of the Bitazza's trading simulator function in the Bitazza Application , designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/321510853_919714646060157_7852334830676686906_n-scaled.jpg", alt: "The online banner showcases the Freedom card campaign, encouraging users to post and share the image of the Freedom card on social media. The campaign was designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/309124222_3151686321709946_5363095839493191081_n-scaled.jpg", alt: "Designally has created a cute 3D graphic design for CAKE, PancakeSwap on Bitazza's platform. The key visual was designed by Designally, incorporating brand elements from PancakeSwap.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/341512966_3135348480095781_5143699826467741173_n.jpg", alt: "Designally has created a futuristic space graphic design to promote Bitazza NFTs.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/386333010_806807051447230_4964043443090435321_n.jpg", alt: "A futuristic gaming style graphic design of key features of the Bitazza's trading simulator function in the Bitazza Application , designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/-------3.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/-------2.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/-------5.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/-------4.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Inlingua-thailand-social-media-1.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Inlingua-thailand-social-media-3.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Inlingua-thailand-social-media-4.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Inlingua-thailand-social-media-2.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Packagin-Khao-San-Tham-2-scaled-e1697795457619.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Packagin-Khao-San-Tham-1-scaled-e1697795482881.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Packaging-De-Vineri-1-scaled.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally-Packaging-De-Vineri-2-scaled.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Packaging_Albotross_6-1.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Packaging_Albotross_2.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Packaging_Albotross_1.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Packaging_Albotross_4-6.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Packaging_Omakase-Don-08.png", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Packaging_Omakase-Don-04.png", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo_Packaging_Woonae_Lipstick_1.jpg", alt: "", categories: ["packaging", "logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo_Packaging_Woonae_Eye-shadow-2.jpg", alt: "", categories: ["packaging", "logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_MANA_IG_Post_1-1.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_MANA_IG_Post_8.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_Ergonoz_IG_post_2-1.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_Ergonoz_IG_post_1-2.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_Ergonoz_IG_post_1-1.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_Ergonoz_IG_post_3-2.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_ALOKIO_Social-Media_1.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_ALOKIO_Social-Media_9.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_ALOKIO_Social-Media_11.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/works-cad9886f/images/Designally_Logo-Design_ALOKIO_Social-Media_6.jpg", alt: "", categories: ["logo-design"] },
];

/** The filter bar, in rendered order. A "/" separator sits between each pair. */
const WORK_FILTERS: readonly DsgWorkFilter[] = [
  { label: "All projects", category: null },
  { label: "Logo Design", category: "logo-design" },
  { label: "Packaging", category: "packaging" },
  { label: "Brand CI", category: "brand-ci" },
  { label: "Website", category: "website" },
  { label: "Social Media", category: "social-media" },
];

/** 3 rows of 4 on the desktop grid, and the same step for every "View More". */
const BATCH_SIZE = 12;

interface WorksPageContentProps {
  /** Tiles to render — see the note on WorksGallery. */
  items?: readonly DsgWorkItem[];
  className?: string;
  /**
   * The page container utility. Required rather than defaulted so `/works/` has a
   * single definition of it: this is a client module, and a client module's
   * exports reach a server component as client references rather than as their
   * values, so the route cannot read a constant declared here. The route owns
   * the string and hands the same one to `shared/CaseStudySection`.
   */
  containerClassName: string;
}

export function WorksPageContent({
  className,
  containerClassName,
  items = WORK_ITEMS,
}: WorksPageContentProps) {
  const [activeCategory, setActiveCategory] = useState<DsgWorkCategory | null>(
    null,
  );
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);

  const filteredItems = useMemo<readonly DsgWorkItem[]>(
    () =>
      activeCategory === null
        ? items
        : items.filter((item) => item.categories.includes(activeCategory)),
    [activeCategory, items],
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  /** Changing the filter always rewinds the reveal back to the first batch. */
  function selectCategory(category: DsgWorkCategory | null): void {
    setActiveCategory(category);
    setVisibleCount(BATCH_SIZE);
  }

  return (
    <>
      {/*
        Masthead `aa96562` — 1425 x 342 directly under the header, so 80px above
        the text row and 160px below it. Unlike the homepage's centred version,
        this row is flush with the container's left edge and carries no filter bar.
      */}
      <section
        className={cn(
          "relative flex w-full flex-col font-sans",
          className,
        )}
      >
        <div
          className={cn(
            containerClassName,
            "pt-[40px] pb-[80px]",
            "tab:pt-[60px] tab:pb-[120px]",
            "desk:pt-[80px] desk:pb-[160px]",
          )}
        >
          <div className="flex flex-row flex-wrap items-start">
            {/*
              Three separate <h1> on the live page, kept as one heading with
              spans here so the section exposes a single h1. The measured 23px
              word gap is the 102px type's own spacing (16px at the homepage's
              72px), and every run sits on the same y=212 baseline row.
            */}
            <h1
              className={cn(
                "flex flex-row flex-wrap gap-x-[12px] tab:gap-x-[16px] desk:gap-x-[23px]",
                "font-serif font-medium text-dsg-ink-strong",
                "text-[48px] leading-[52px]",
                "tab:text-[72px] tab:leading-[76px]",
                "desk:text-[102px] desk:leading-[102px]",
              )}
            >
              <span>Explore</span>
              <span>our</span>
              <span className="text-dsg-orange">works</span>
            </h1>

            {/*
              Decorative: it hangs 50px above the text row (svg y=162 vs text
              y=212) and drops out entirely below 768px, as on the homepage.
              The wrapper is clamped to the 102px line height on desktop so the
              258px-tall drawing overflows the row instead of growing it — the
              live masthead is exactly 80 + 102 + 160 = 342px tall, which means
              the illustration is out of the flow there too.
              Plain <img> because next/image will not optimise an SVG without
              `dangerouslyAllowSVG`. Same asset as `/`, rendered 377 x 258 here.
            */}
            <div
              aria-hidden="true"
              className="hidden shrink-0 tab:ml-[24px] tab:block desk:ml-[44px] desk:h-[102px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ILLUSTRATION_SRC}
                alt=""
                width={377}
                height={258}
                className="h-auto w-[260px] desk:-mt-[50px] desk:w-[377px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/*
        Gallery `13a2e40` — 1425 x 1258 at y=474. The filter bar starts flush
        with the section top (no top padding); the grid follows at y=539 (24px
        bar + its 40px margin), the button 80px under the grid, then 160px of
        bottom padding.
      */}
      <section className="relative flex w-full flex-col font-sans">
        <div
          className={cn(
            containerClassName,
            "flex flex-col items-center pb-[80px] tab:pb-[120px] desk:pb-[160px]",
          )}
        >
          {/* Filter bar — centred; the 40px below it is the buttons' own
              margin-bottom rather than the bar's. */}
          <nav
            aria-label="Filter works by category"
            className="flex w-full flex-row items-center justify-center"
          >
            <ul className="flex flex-row flex-wrap items-center justify-center text-center">
              {WORK_FILTERS.map((filter, index) => {
                const isActive = filter.category === activeCategory;

                return (
                  <li key={filter.label} className="flex flex-row items-center">
                    {index > 0 ? (
                      /* Decorative separator — never interactive. */
                      <span
                        aria-hidden="true"
                        className="mb-[40px] block h-[24px] px-[12px] text-[16px] font-normal leading-[24px] text-dsg-ink-strong"
                      >
                        /
                      </span>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => selectCategory(filter.category)}
                      aria-pressed={isActive}
                      className={cn(
                        "mb-[40px] block h-[24px] cursor-pointer px-[12px]",
                        "text-center text-[16px] font-normal leading-[24px]",
                        "transition-colors duration-300 ease-in-out",
                        isActive
                          ? "text-dsg-orange"
                          : "text-dsg-ink-strong hover:text-dsg-orange focus-visible:text-dsg-orange",
                      )}
                    >
                      {filter.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Grid wrapper — `overflow-hidden` mirrors the isotope container and
              also clips the 1.1x hover zoom at the outer edge. */}
          <div className="w-full overflow-hidden">
            <div className="relative grid w-full grid-cols-2 tab:grid-cols-3 desk:grid-cols-4">
              {visibleItems.map((item) => {
                if (!item.src) return null;

                return (
                  <figure
                    key={item.src}
                    className="group m-0 aspect-square w-full p-[8px]"
                  >
                    <div className="h-full w-full overflow-hidden rounded-[16px]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={284}
                        height={284}
                        sizes="(max-width: 767px) 50vw, (max-width: 1024px) 33vw, 300px"
                        className={cn(
                          "h-full w-full object-cover",
                          "transition-transform duration-300 ease-in-out",
                          "scale-100 group-hover:scale-110",
                        )}
                      />
                    </div>
                  </figure>
                );
              })}
            </div>
          </div>

          {/* "View More" disappears once the current filter is fully revealed. */}
          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + BATCH_SIZE)}
              className={cn(
                "mt-[40px] inline-flex cursor-pointer items-center tab:mt-[60px] desk:mt-[80px]",
                "rounded-[200px] border border-dsg-orange bg-transparent",
                "pt-[16px] pr-[40px] pb-[16px] pl-[48px]",
                "text-center text-[16px] font-medium leading-[19.2px] text-dsg-orange",
                "transition-colors duration-300 ease-in-out",
                "hover:bg-dsg-orange hover:text-white",
                "focus-visible:bg-dsg-orange focus-visible:text-white",
              )}
            >
              View More
            </button>
          ) : null}
        </div>
      </section>
    </>
  );
}
