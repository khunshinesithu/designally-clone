import Image from "next/image";

import { cn } from "@/lib/utils";
import type { DsgServiceCard } from "@/types/designally";

import { DoubleChevronIcon } from "../shared/icons";

const IMAGE_BASE = "/sites/designally-co-e422ade5/root-8a5edab2/images";

/**
 * The five service cards of the Services section, in live-site order.
 *
 * Cards 1, 4 and 5 carry the anchor ids the sticky panel's in-page links target
 * (`#Branding`, `#Website`, `#DesignAlly`). Every image is 800 × 501 natural.
 */
export const SERVICE_CARDS: DsgServiceCard[] = [
  {
    anchorId: "Branding",
    eyebrow: "BRANDING",
    title: "Brand Core",
    description:
      "We uncover and define your brand’s essence its nature, purpose, and direction to build clarity, differentiation, and communication that truly resonates with your audience.",
    tags: [
      "Naming",
      "Brand Story",
      "Core Values, Vision, Mission",
      "Tagline",
      "Brand Archetype",
      "Brand Personality",
    ],
    image: {
      src: `${IMAGE_BASE}/brandcore.jpg`,
      alt: "Brand Core",
      width: 800,
      height: 501,
    },
  },
  {
    eyebrow: "BRANDING",
    title: "Brand Visuals",
    description:
      "We design essential visual elements for both online and offline communication, guided by your brand identity to make your presence distinct, cohesive, and memorable.",
    tags: [
      "Logo Design",
      "Typography",
      "Color Scheme",
      "Logo Guideline",
      "Graphic Elements",
    ],
    image: {
      src: `${IMAGE_BASE}/brandvisual.jpg`,
      alt: "Brand Visuals",
      width: 800,
      height: 501,
    },
  },
  {
    eyebrow: "BRANDING",
    title: "Brand Execution",
    description:
      "Every touchpoint is a chance to impress. We equip your brand with clear, consistent, and well-crafted communication delivered with precision.",
    tags: [
      "Collateral",
      "Social Media Template",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: {
      src: `${IMAGE_BASE}/brandexc.jpg`,
      alt: "Brand Execution",
      width: 800,
      height: 501,
    },
  },
  {
    anchorId: "Website",
    eyebrow: "WEBSITE",
    title: "Website + Dev",
    description:
      "We design and develop websites that reflect your brand with clarity—optimized for user experience, search visibility, and digital performance to support your growth.",
    tags: [
      "Informative",
      "Corporate",
      "E-Commerce",
      "Booking Platform",
      "Web Application",
      "Sales Page",
      "Investor Relation",
    ],
    image: {
      src: `${IMAGE_BASE}/website.jpg`,
      alt: "Website + Dev",
      width: 800,
      height: 501,
    },
  },
  {
    anchorId: "DesignAlly",
    eyebrow: "Your Design Ally",
    title: "Design Support",
    description:
      "Our design support covers all your creative needs—per project or monthly—with a professional team, clear workflow and designs that meet your goals.",
    tags: [
      "Design Outsourcing",
      "Graphic Design",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: {
      src: `${IMAGE_BASE}/designsupport.jpg`,
      alt: "Design Support",
      width: 800,
      height: 501,
    },
  },
];

export interface ServiceCardProps {
  card: DsgServiceCard;
  className?: string;
}

/**
 * One card of the Services column.
 *
 * Static apart from the CSS-only hover on the pill tags (transparent → solid
 * orange over 0.3s), so this stays a server component.
 *
 * Measured at 1440×900: 356.25px column, 43.2px/43.2px title, 15px/22.5px body,
 * 34px pills with a 1px rgb(245,99,65) border and a 200px radius, image 800/501.
 */
export function ServiceCard({ card, className }: ServiceCardProps) {
  const { anchorId, eyebrow, title, description, tags, image } = card;

  return (
    <article
      id={anchorId}
      className={cn(
        "flex w-full flex-col font-sans desk:w-[356.25px]",
        className,
      )}
    >
      <div className="flex h-[36px] items-center">
        <DoubleChevronIcon width={11} height={24} className="shrink-0" />
        <h3 className="ml-[26px] text-[20px] font-medium leading-[26px] text-dsg-ink-strong">
          {eyebrow}
        </h3>
      </div>

      <h1 className="mt-[24px] text-[32px] font-semibold leading-[32px] text-dsg-ink-strong tab:text-[36px] tab:leading-[36px] desk:text-[43.2px] desk:leading-[43.2px]">
        {title}
      </h1>

      <p className="mt-[24px] text-[15px] font-normal leading-[22.5px] text-dsg-ink-strong">
        {description}
      </p>

      <div className="mt-[24px] flex flex-wrap gap-[8px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block h-[34px] rounded-[200px] border border-dsg-orange bg-transparent px-[16px] py-[8px] text-center text-[16px] font-normal leading-[16px] text-dsg-orange transition-[background-color,color] duration-300 hover:bg-dsg-orange hover:text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="mt-[24px] h-auto w-full rounded-none"
        sizes="(min-width: 1025px) 356px, 100vw"
      />
    </article>
  );
}
