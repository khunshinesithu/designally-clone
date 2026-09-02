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
import type { DsgServiceNavRow } from "@/types/designally";

import { ArrowUpRightIcon } from "../shared/icons";
import { ServiceCard, SERVICE_CARDS } from "./ServiceCard";

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
  className?: string;
}

export function ServicesSection({ className }: ServicesSectionProps) {
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
      <aside
        className={cn(
          "w-full rounded-r-[80px] bg-dsg-orange px-[5%] pt-[80px] pb-[80px]",
          "tab:px-[6%] tab:pt-[100px] tab:pb-[100px]",
          "desk:sticky desk:top-0 desk:w-1/2 desk:self-start",
          "desk:px-0 desk:pt-[114px] desk:pb-0 desk:pl-[12.5%]",
        )}
      >
        <div className="flex w-full flex-col desk:h-[740px] desk:w-[356.25px]">
          <h1 className="font-serif text-[36px] font-medium leading-[36px] text-white tab:text-[44px] tab:leading-[44px] desk:text-[50.4px] desk:leading-[50.4px]">
            OUR SERV<i>I</i>CES
          </h1>

          <p className="mt-[40px] mb-[14.4px] text-[16px] font-normal leading-[24px] text-white">
            We provide comprehensive design solutions for every business—from
            branding to website development and ongoing creative support—tailored
            to what your brand truly needs.
          </p>

          {/* 4 rows on a 95px pitch: 71px tall + 24px gap = 356px overall. */}
          <nav className="flex w-full flex-col gap-[24px]">
            {NAV_ROWS.map((row) => (
              <a
                key={row.number}
                href={row.href}
                className="group flex h-[71px] w-full border-b border-white transition-[background-color,border-color,box-shadow,transform] duration-300"
              >
                <div className="flex h-[70px] w-full items-center justify-start pb-[24px]">
                  <h3 className="text-[20px] font-medium leading-[26px] text-white/48">
                    {row.number}
                  </h3>
                  <h1 className="ml-[16px] text-[23.04px] font-medium leading-[29.952px] text-white transition-colors duration-300 group-hover:text-dsg-ink-strong">
                    {row.label}
                  </h1>
                  <span className="ml-auto flex h-[46px] w-[35.96px] items-center justify-center text-center text-white">
                    <ArrowUpRightIcon width={40} height={40} />
                  </span>
                </div>
              </a>
            ))}
          </nav>

          <a
            href="/contact-us/"
            className="mt-[55px] inline-block self-start rounded-[200px] border-[2px] border-white bg-transparent px-[32px] py-[16px] text-center text-[16px] font-medium leading-[19.2px] text-white transition-colors duration-300 hover:bg-white hover:text-dsg-orange"
          >
            Start Your Project with Designally
          </a>
        </div>
      </aside>

      {/*
        Card column. The 12.5% right padding puts the 356.25px column's right
        edge exactly on the page container's right edge (x = 1247 at 1425px).
      */}
      <div className="mt-[80px] flex w-full justify-end px-[5%] tab:px-[6%] desk:mt-0 desk:w-1/2 desk:px-0 desk:pr-[12.5%]">
        <div className="flex w-full flex-col gap-[160px] desk:w-[356.25px]">
          {SERVICE_CARDS.map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
