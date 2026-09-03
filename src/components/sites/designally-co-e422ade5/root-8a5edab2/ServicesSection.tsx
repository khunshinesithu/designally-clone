/**
 * designally.co — "OUR SERVICES" section (.elementor-element-bd5220f).
 *
 * A scroll-driven layout, NOT a tabbed interface: the orange panel on the left
 * is `position: sticky; top: 0` and pins while the five service cards on the
 * right scroll past it. The numbered rows are plain links — they never gain an
 * active state, there is no scroll-spy and none should be added.
 *
 * The panel and the card column must stay siblings inside this one positioned
 * parent; splitting them across components would break the sticky containment.
 *
 * Layout maths at the measured 1425px content width:
 *   page container  = 75% centred  → gutter 178.125px = 12.5% of the section
 *   panel           = 50% (712.5px), bleeding to x = 0, text starting at x = 178
 *   card column     = 356.25px, right-aligned to the container edge (x = 891)
 * Percentage gutters keep that relationship at any desktop width.
 *
 * Every value below is `getComputedStyle` output from the live site at 1440×900.
 */

import { cn } from "@/lib/utils";
import type { DsgServiceCard, DsgServiceNavRow } from "@/types/designally";

import { ServicesPanel } from "../shared/ServicesPanel";
import { ServiceCard } from "../shared/ServiceCard";
import { SERVICE_CARDS } from "./ServiceCard";

/**
 * The four numbered rows of the panel.
 *
 * Rows 01–03 are in-page anchors resolved by the `id`s ServiceCard renders,
 * relying on the `html { scroll-behavior: smooth }` already in globals.css.
 * There are four rows but five cards — the three BRANDING cards all sit under
 * the single `#Branding` anchor. Row 04 leaves the page.
 */
const NAV_ROWS: readonly DsgServiceNavRow[] = [
  { number: "01", label: "Branding", href: "#Branding" },
  { number: "02", label: "Website Development", href: "#Website" },
  { number: "03", label: "Design Support", href: "#DesignAlly" },
  {
    number: "04",
    label: "Online Brand Guide",
    href: "https://designally.co/online-brand-guide/designally/",
  },
];

interface ServicesSectionProps {
  /**
   * The five cards. Supplied by the route from Sanity, falling back to the seed.
   * Defaults to the original hardcoded set so the section renders standalone.
   */
  cards?: readonly DsgServiceCard[];
  className?: string;
}

export function ServicesSection({ className, cards = SERVICE_CARDS }: ServicesSectionProps) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-col font-sans desk:flex-row",
        className,
      )}
    >
      {/*
        Sticky only from 1025px up. `self-start` is load-bearing: a stretched
        flex item would be as tall as the whole section and could never move,
        which silently disables `position: sticky`.
      */}
      <ServicesPanel
        heading={["OUR SERV", "I", "CES"]}
        intro="We provide comprehensive design solutions for every business—from branding to website development and ongoing creative support—tailored to what your brand truly needs."
        rows={NAV_ROWS}
        cta={{ label: "Start Your Project with Designally", href: "/contact-us/" }}
        topClassName="desk:pt-[114px]"
      />


      {/*
        Card column. The 12.5% right padding puts the 356.25px column's right
        edge exactly on the page container's right edge (x = 1247 at 1425px).
      */}
      {/*
        The card column centres its 540px cards in the half-width, matching
        /services/. The old `pr-[12.5%]` left only 535px, so a 540px card ran
        past the column edge once both pages shared the same card.
      */}
      <div className="mt-[80px] flex w-full justify-center px-[24px] pb-[80px] tab:px-[6.2%] tab:pb-[100px] desk:mt-0 desk:w-1/2 desk:px-0 desk:pt-[160px] desk:pb-[160px]">
        <div className="mx-auto flex w-full flex-col gap-[160px] desk:w-[540px]">
          {cards.map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
