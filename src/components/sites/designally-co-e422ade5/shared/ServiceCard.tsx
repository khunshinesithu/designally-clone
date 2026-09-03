import Image from "next/image";

import { cn } from "@/lib/utils";

import { DoubleChevronIcon } from "./icons";

/**
 * A card title, split around the letter the live markup italicises — the house
 * detail where one letter of a heading is set in EB Garamond italic. Pass a
 * plain string when a title has none.
 */
export type ItalicTitle = string | readonly [string, string, string];

export interface SharedServiceCard {
  /** In-page anchor the services panel's numbered rows target. */
  anchorId?: string;
  eyebrow: string;
  title: ItalicTitle;
  /** The paragraph under the heading. */
  description: string;
  tags: readonly string[];
  image: { src: string; alt: string; width: number; height: number };
  /** Hand-tuned per-card spacing on /services/, where the cards align to the pinned panel. */
  gapAboveClass?: string;
  imageGapClass?: string;
}

/**
 * One service card, shared by the homepage and /services/.
 *
 * Both pages render the same card on the live site; the copy differs but the
 * layout does not. Measured on /services/ at 1440x900, which is the sizing both
 * now use:
 *
 *   column     540px
 *   eyebrow    the 11x24 double-chevron, 16px gap, Poppins 20/26 500 #212121
 *   title      EB Garamond 76/76 500 #212121, one letter italic
 *   deck       Poppins 16/24 #212121
 *   tags       14/14 400 #F56341, 32px tall, 1px border, 200px radius, 8/16 pad
 *   image      540 x 339 with an 8px radius
 *
 * Vertical gaps, measured between block edges: eyebrow -> title 29, title ->
 * deck 24, deck -> tags 24, tags -> image 48.
 *
 * Static apart from the CSS-only hover on the pills, so it stays a server
 * component.
 */
export function ServiceCard({
  card,
  className,
}: {
  card: SharedServiceCard;
  className?: string;
}) {
  const { anchorId, eyebrow, title, description, tags, image } = card;

  return (
    <article
      id={anchorId}
      className={cn(
        // No vertical inset of its own: the space between cards is the live
        // image-to-next-eyebrow gap (165/165/189 on /services/), which each
        // page supplies. A 24px inset here would add 48 to every one of them.
        "flex w-full flex-col font-sans desk:w-[540px]",
        card.gapAboveClass,
        className,
      )}
    >
      <div className="flex items-center">
        <DoubleChevronIcon width={11} height={24} className="shrink-0" />
        <h3 className="ml-[16px] text-[20px] font-medium leading-[26px] text-dsg-ink-strong">
          {eyebrow}
        </h3>
      </div>

      <h1 className="mt-[29px] font-serif text-[40px] font-medium leading-[40px] text-dsg-ink-strong tab:text-[56px] tab:leading-[56px] desk:text-[76px] desk:leading-[76px]">
        {typeof title === "string" ? (
          title
        ) : (
          <>
            {title[0]}
            <i>{title[1]}</i>
            {title[2]}
          </>
        )}
      </h1>

      <p className="mt-[24px] text-[16px] font-normal leading-[24px] text-dsg-ink-strong">
        {description}
      </p>

      <ul className="mt-[24px] flex flex-wrap gap-[8px]">
        {tags.map((tag) => (
          <li
            key={tag}
            className="inline-block rounded-[200px] border border-dsg-orange bg-transparent px-[16px] py-[8px] text-center text-[14px] font-normal leading-[14px] text-dsg-orange transition-[background-color,color] duration-300 hover:bg-dsg-orange hover:text-white"
          >
            {tag}
          </li>
        ))}
      </ul>

      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1025px) 540px, 100vw"
        className={cn("mt-[48px] h-auto w-full rounded-[8px]", card.imageGapClass)}
      />
    </article>
  );
}
