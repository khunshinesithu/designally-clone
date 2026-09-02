"use client";

/**
 * designally.co — "Explore our works" gallery (.elementor-element-36d3a17).
 *
 * The live widget is a Premium Addons `premium-img-gallery` running isotope in
 * `fitRows` mode with the `zoomin` hover skin. Isotope absolutely positions each
 * tile and animates it on filter change; that is reproduced here with a plain
 * CSS grid plus React state, which lands on the same measured geometry without
 * the layout thrash. Do NOT re-introduce absolute positioning.
 *
 * Layout maths at the measured 1425px content width:
 *   grid width  = 1097.25px = 4 × 274.312px tiles
 *   tile        = 274.312px square, 8px padding → 258.312px image, 16px radius
 *   so the visible gutter between two images is 2 × 8px = 16px and the grid
 *   itself carries no `gap`.
 *
 * Two behaviours are click-driven: the category filter bar and the "View More"
 * button (12 tiles per batch, reset to 12 whenever the filter changes).
 *
 * Every value below is `getComputedStyle` output from the live site at 1440×900.
 */

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type {
  DsgWorkCategory,
  DsgWorkFilter,
  DsgWorkItem,
} from "@/types/designally";

/**
 * The 56 renderable tiles, in the live DOM order. Two of the 58 source items
 * carry no `<img>` at all and are omitted; every `src` here exists on disk.
 *
 * Eight items belong to more than one category (the Thai Gem Center set is
 * logo-design + brand-ci + packaging, the insight-ERA set is logo-design +
 * brand-ci) and must therefore show up under each of them.
 */
export const WORK_ITEMS: DsgWorkItem[] = [
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Charmy_IG_Designally-Post_2-2-scaled.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Logo-design-foodie.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Logo-design-tattva.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Logo-design-sofresh.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Logo-design-sook-sabai-spa.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Logo-design-De-Vineri.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Logo-design-Utopia-group.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Logo-design-Success-group.jpg", alt: "", categories: ["logo-design"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Pet-Party-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Nanobag-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Rak-Mao-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/PEA-1080x1920px-1.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Thai-Gem-Center_IG-Post_Post_3-2-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/ThaiGem_IG-Post_edit.jpg", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/ThaiGem_IG-Post_Post_5-1-e1697706345846.png", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Thai-Gem-Center_IG-Post_Post_3-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci", "packaging"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Seacon-Pro-_IG-Post-03-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Seacon-Pro-_IG-Post-02-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Seacon-Pro-_IG-Post-09-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Seacon-Pro-_IG-Post-08-scaled.jpg", alt: "", categories: ["brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/insight-ERA_2-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/insight-ERA_3-2.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/insight-ERA_1-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/insight-ERA_1-2-1-scaled.jpg", alt: "", categories: ["logo-design", "brand-ci"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Pomelo-Career-web-search-scaled.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Pomelo-Career-web-linked-in-scaled.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Mjets-website-mockup-scaled-e1697708818477.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Mjets-website-mockup-1-scaled-e1697708999896.jpg", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-websiteHuawei-1.webp", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-websiteHuawei-2.webp", alt: "", categories: ["website"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/UNK-2023-Poster_SQ.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/UNK-Gathering-Poster_SQ.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/72653360_2434651543239312_6881135772582281216_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/69078711_2335796459791488_7838476904754577408_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/68273449_2310893275615140_2687913807988129792_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/72427118_2432596203444846_836697455037775872_n.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/347781850_6051770704949177_5622929737336053476_n-scaled.jpg", alt: "A futuristic gaming style graphic design of key features of the Bitazza cryptocurrency trading platform, designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/362920442_217355491291134_2956835042896295031_n.jpg", alt: "The online banner depicts an individual grasping a mobile phone, showcasing the user interface of Freedom Card. The interface displays the upgrade card stage, accompanied by a hand clasping a pink Freedom Card in close proximity.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/350535470_979839496781451_4827950317788281151_n-scaled.jpg", alt: "The infographic showcasing Bitazza's platform key features was expertly crafted by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/344592478_942011020175548_2643397633021433264_n-scaled.jpg", alt: "A futuristic gaming style graphic design of key features of the Bitazza's trading simulator function in the Bitazza Application , designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/321510853_919714646060157_7852334830676686906_n-scaled.jpg", alt: "The online banner showcases the Freedom card campaign, encouraging users to post and share the image of the Freedom card on social media. The campaign was designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/309124222_3151686321709946_5363095839493191081_n-scaled.jpg", alt: "Designally has created a cute 3D graphic design for CAKE, PancakeSwap on Bitazza's platform. The key visual was designed by Designally, incorporating brand elements from PancakeSwap.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/341512966_3135348480095781_5143699826467741173_n.jpg", alt: "Designally has created a futuristic space graphic design to promote Bitazza NFTs.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/386333010_806807051447230_4964043443090435321_n.jpg", alt: "A futuristic gaming style graphic design of key features of the Bitazza's trading simulator function in the Bitazza Application , designed by Designally.", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/-------3.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/-------2.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/-------5.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/-------4.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Inlingua-thailand-social-media-1.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Inlingua-thailand-social-media-3.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Inlingua-thailand-social-media-4.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Inlingua-thailand-social-media-2.jpg", alt: "", categories: ["social-media"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Packagin-Khao-San-Tham-2-scaled-e1697795457619.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Packagin-Khao-San-Tham-1-scaled-e1697795482881.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Packaging-De-Vineri-1-scaled.jpg", alt: "", categories: ["packaging"] },
  { src: "/sites/designally-co-e422ade5/root-8a5edab2/images/Designally-Packaging-De-Vineri-2-scaled.jpg", alt: "", categories: ["packaging"] },
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

const ILLUSTRATION_SRC =
  "/sites/designally-co-e422ade5/shared/svg/works-illustration.svg";

interface WorksGalleryProps {
  className?: string;
}

export function WorksGallery({ className }: WorksGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<DsgWorkCategory | null>(
    null,
  );
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);

  const filteredItems = useMemo<DsgWorkItem[]>(
    () =>
      activeCategory === null
        ? WORK_ITEMS
        : WORK_ITEMS.filter((item) => item.categories.includes(activeCategory)),
    [activeCategory],
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  /** Changing the filter always rewinds the reveal back to the first batch. */
  function selectCategory(category: DsgWorkCategory | null): void {
    setActiveCategory(category);
    setVisibleCount(BATCH_SIZE);
  }

  return (
    <section className={cn("relative flex w-full flex-col font-sans", className)}>
      <div
        className={cn(
          "flex flex-col items-center",
          "gap-[24px] px-[8.1%] py-[80px]",
          "tab:gap-[16px] tab:px-[6.2%] tab:py-[120px]",
          // The live inner has only two children - the heading block and the
          // gallery block - and they sit flush: heading block ends at y=6148,
          // the gallery starts at y=6154. So the desktop gap is ~6px, not 120.
          "desk:gap-[6px] desk:px-[12.5%] desk:py-[160px]",
        )}
      >
        {/*
          Heading row. Three separate <h1> on the live page — kept as one <h1>
          with inline spans here so the section exposes a single heading, which
          is what the visual row actually is. The illustration hangs 50px above
          the text baseline row (heading y=5959 vs svg y=5909) and is decorative,
          so it drops out entirely below 768px.
        */}
        <div className="flex w-full flex-row flex-wrap items-start justify-center gap-x-[16px] gap-y-[8px]">
          <h1
            className={cn(
              "flex flex-row flex-wrap justify-center gap-x-[16px]",
              "font-serif font-medium text-dsg-ink-strong",
              "text-[40px] leading-[44px]",
              "tab:text-[56px] tab:leading-[60px]",
              "desk:text-[72px] desk:leading-[72px]",
            )}
          >
            <span>Explore</span>
            <span>our</span>
            <span className="text-dsg-orange">works</span>
          </h1>

          {/* Plain <img>: an SVG, which next/image will not optimise without
              `dangerouslyAllowSVG`. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ILLUSTRATION_SRC}
            alt=""
            aria-hidden="true"
            width={349}
            height={239}
            className={cn(
              "hidden h-auto shrink-0 tab:block",
              "tab:ml-[24px] tab:w-[240px]",
              "desk:-mt-[50px] desk:ml-[41px] desk:w-[349px]",
            )}
          />
        </div>

        {/*
          Gallery block — the live `.premium-img-gallery` wrapper. Its three
          parts are NOT evenly spaced flex children: the filter bar is 64.5px
          tall, the grid starts immediately beneath it, and the "View More"
          button sits 80px below the grid.
        */}
        <div className="flex w-full flex-col items-center">
          {/* Filter bar — 1097.25 × 64.5 at 1440, the 40px coming from the
              buttons' own margin-bottom rather than the bar. */}
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
            also clips the 1.1× hover zoom at the outer edge. */}
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
                      width={274}
                      height={274}
                      sizes="(max-width: 767px) 50vw, (max-width: 1024px) 33vw, 275px"
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
      </div>
    </section>
  );
}
