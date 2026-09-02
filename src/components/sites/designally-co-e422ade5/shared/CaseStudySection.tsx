/**
 * designally.co — "Case Study" section (.elementor-element-615fd02).
 *
 * A static 2 × 2 grid of link cards (.elementor-element-3db6188) under a
 * split heading row. The only motion is a CSS-only image zoom on card hover,
 * so this stays a server component.
 *
 * Layout maths at the measured 1425px content width:
 *   .dsg-container   = 75% centred → 1068.75px
 *   card             = 522.375px ×2 + 24px column gap = 1068.75px exactly
 *   card image       = 522.375 × 293.836 → aspect-ratio 800 / 450
 *   card height      = 293.836 + 24 + 23.4 + 8 + 24 = 373.234px
 *   grid top         = 160px padding + 52px heading line + 80px = 292px
 *
 * Every value below is `getComputedStyle` output from the live site at 1440×900.
 */

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { DsgCaseStudy } from "@/types/designally";

const IMAGE_BASE = "/sites/designally-co-e422ade5/root-8a5edab2/images";

/**
 * The four cards in 2 × 2 reading order.
 *
 * `meta` is the full rendered line; the card splits it at its first " / " so
 * the industry, the separator and the services list become the three separate
 * spans the live markup uses. Every image is 800 × 450 natural.
 */
export const CASE_STUDIES: readonly DsgCaseStudy[] = [
  {
    client: "Skytower",
    meta: "Industrial & Manufacturing / Branding / Website",
    href: "https://designally.co/works/skytower-rebranding-and-website-projects/",
    image: {
      src: `${IMAGE_BASE}/Skytower-1024x576.jpg`,
      alt: "Skytower",
      width: 800,
      height: 450,
    },
  },
  {
    client: "Bitazza Thailand/Global",
    meta: "Financial Services / Design Support / Website",
    href: "https://designally.co/works/bitazza-design-support-and-website/",
    image: {
      src: `${IMAGE_BASE}/Bitazza-1024x576.jpg`,
      alt: "Bitazza Thailand/Global",
      width: 800,
      height: 450,
    },
  },
  {
    client: "Laga",
    meta: "Consumers Products / Branding / Website",
    href: "https://designally.co/works/laga-branding-and-website-project/",
    image: {
      src: `${IMAGE_BASE}/LAGA-1024x576.jpg`,
      alt: "Laga",
      width: 800,
      height: 450,
    },
  },
  {
    client: "INN News",
    meta: "Corporate / Branding / Website",
    href: "https://designally.co/works/inn-news-rebranding-and-website-projects/",
    image: {
      src: `${IMAGE_BASE}/INN-News-1024x576.jpg`,
      alt: "INN News",
      width: 800,
      height: 450,
    },
  },
];

/** rgb(114, 120, 164) — the muted blue-grey used only by the card meta row. */
const META_COLOUR = "text-[#7278a4]";

/**
 * Splits the meta line at its FIRST " / " so "Industrial & Manufacturing /
 * Branding / Website" yields the industry and the whole services list, leaving
 * any further slashes inside the services span exactly as the live site does.
 */
function splitMeta(meta: string): { industry: string; services: string } {
  const at = meta.indexOf(" / ");
  if (at === -1) return { industry: meta, services: "" };
  return { industry: meta.slice(0, at), services: meta.slice(at + 3) };
}

function CaseStudyCard({ study }: { study: DsgCaseStudy }) {
  const { industry, services } = splitMeta(study.meta);

  return (
    <a
      href={study.href}
      className={cn(
        "group relative flex w-full flex-col",
        "transition-[background,border,box-shadow,transform] duration-300",
      )}
    >
      {/*
        `overflow-clip` + the 16px radius live on the wrapper so the hovered
        image scales *inside* the rounded box. aspect-[800/450] reproduces the
        522.375 × 293.836 measurement at any container width.
      */}
      <div className="relative w-full aspect-[800/450] overflow-clip rounded-[16px]">
        <Image
          src={study.image.src}
          alt={study.image.alt}
          width={study.image.width}
          height={study.image.height}
          className={cn(
            "h-full w-full object-cover",
            "transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]",
          )}
        />
      </div>

      <h2 className="mt-[24px] w-full text-[18px] font-medium leading-[23.4px] text-dsg-ink-strong">
        {study.client}
      </h2>

      {/* Three inline spans; the separator is its own 18.82px-wide box. */}
      <div
        className={cn(
          "mt-[8px] text-[16px] font-normal leading-[24px]",
          META_COLOUR,
        )}
      >
        <span>{industry}</span>
        <span className="inline-block w-[18.82px] text-center">/</span>
        <span>{services}</span>
      </div>
    </a>
  );
}

export interface CaseStudySectionProps {
  className?: string;
  /**
   * Which case studies to show. Defaults to the four on the homepage; `/works/`
   * passes six. The card itself is fluid — its measured 522.375px on `/` and
   * 588px on `/works/` are both just `(container - 24px gap) / 2`, so the only
   * thing that changes between the two pages is the container width.
   */
  studies?: readonly DsgCaseStudy[];
  /**
   * Container utility. `/` uses the fluid `.dsg-container` (75%); `/works/` and the
   * other inner pages use a fixed `max-w-[1200px] mx-auto`.
   */
  containerClassName?: string;
  /**
   * Whether to render the "View All Projects" pill under the grid. The homepage has
   * it; `/works/` does not (measured: no such text anywhere in its case-study
   * section) — it would be a link to the page you are already on.
   */
  showViewAll?: boolean;
  /**
   * Vertical padding on the inner container. The homepage measures `160px 0`;
   * `/works/` measures `0 0 160px` — its heading sits flush with the section top.
   */
  paddingClassName?: string;
}

export function CaseStudySection({
  className,
  studies = CASE_STUDIES,
  containerClassName = "dsg-container",
  showViewAll = true,
  paddingClassName = "py-[160px]",
}: CaseStudySectionProps) {
  return (
    <section
      className={cn("relative flex w-full flex-col font-sans", className)}
    >
      <div className={cn(containerClassName, "flex flex-col", paddingClassName)}>
        {/*
          space-between row from 1025px up: "Case Study" flush left, the
          three-part line flush right. Below that the right group drops onto
          its own line, left-aligned under the title.
        */}
        <div className="flex flex-col gap-[16px] desk:flex-row desk:items-baseline desk:justify-between desk:gap-[24px]">
          <div className="flex flex-row items-baseline gap-[11.9px] text-[32px] font-medium leading-[42px] desk:text-[40px] desk:leading-[52px]">
            <h1 className="text-dsg-ink-strong">Case</h1>
            <h1 className="text-dsg-orange">Study</h1>
          </div>

          <div className="flex flex-row flex-wrap items-baseline gap-x-[5px] text-[20px] font-medium leading-[26px] desk:justify-end desk:text-end">
            <h2 className="text-dsg-ink-strong">Unveiling</h2>
            <h2 className="text-dsg-orange">Success Stories</h2>
            <h2 className="text-dsg-ink-strong">of our clients</h2>
          </div>
        </div>

        {/*
          One column on mobile with a 40px row gap; 2 × 2 from 768px, where the
          24px column gap lands the cards on 522.375px at 1440.
        */}
        <div className="mt-[40px] grid grid-cols-1 gap-y-[40px] tab:mt-[56px] tab:grid-cols-2 tab:gap-x-[24px] tab:gap-y-[56px] desk:mt-[80px]">
          {studies.map((study) => (
            <CaseStudyCard key={study.href} study={study} />
          ))}
        </div>

        {showViewAll ? (
        <>
        {/*
          "View All Projects" — measured on the live site as a 103.203px block
          below the grid: 48px of top padding above a centred outline pill
          (246.391 × 55.203, padding 16px 56px, 2px orange border, radius 200px).
        */}
        <div className="pt-[48px] text-center">
          <Link
            href="/works/"
            className="inline-block rounded-[200px] border-2 border-dsg-orange px-[56px] py-[16px] text-center text-[16px] font-medium leading-[19.2px] text-dsg-orange transition-colors duration-300 hover:bg-dsg-orange hover:text-white focus-visible:bg-dsg-orange focus-visible:text-white"
          >
            View All Projects
          </Link>
        </div>
        </>
        ) : null}
      </div>
    </section>
  );
}
