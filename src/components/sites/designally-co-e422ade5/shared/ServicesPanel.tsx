import { cn } from "@/lib/utils";

import { ArrowUpRightIcon } from "./icons";

export interface ServicesPanelRow {
  number: string;
  label: string;
  href: string;
}

export interface ServicesPanelProps {
  /** The heading, split around its italic letter — "OUR SERV<i>I</i>CES". */
  heading: readonly [string, string, string];
  intro: string;
  rows: readonly ServicesPanelRow[];
  cta: { label: string; href: string };
  /** Top padding, which also sets where the sticky content pins. */
  topClassName?: string;
  className?: string;
}

/**
 * The orange services panel, shared by the homepage and /services/.
 *
 * The column runs the full height of its section — measured `min-height: 900px`
 * (the viewport) stretching to the whole section, with a 80px right radius. The
 * column is not what sticks; the content inside it is, so the orange stays
 * behind the cards all the way down.
 *
 * Sizing follows /services/, which is the larger of the two on the live site:
 * heading EB Garamond 76/76, a 540px column, rows 77px tall with 20/500 numbers
 * at 48% white and 40/500 labels. The button is the homepage's — 16/32 padding
 * on a 2px border, sized to its text rather than a fixed 210px.
 */
export function ServicesPanel({
  heading,
  intro,
  rows,
  cta,
  topClassName = "desk:pt-[160px]",
  className,
}: ServicesPanelProps) {
  return (
    <aside
      className={cn(
        "w-full rounded-r-[80px] bg-dsg-orange px-[24px] pt-[80px] pb-[80px]",
        "tab:px-[6.2%] tab:pt-[100px] tab:pb-[100px]",
        "desk:min-h-screen desk:w-1/2 desk:px-0 desk:pb-0",
        topClassName,
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-[40px]",
          // 540 centred in the 713px half-column leaves the 86.25px margins the
          // live /services/ panel has. Left-aligning it at 12.5% — which suited
          // the homepage's older, narrower column — overruns the panel edge.
          "desk:sticky desk:mx-auto desk:w-[540px]",
          // Pin the content where the column's own top padding leaves it.
          topClassName.replace("pt-", "top-"),
        )}
      >
        <h1 className="font-serif text-[56px] font-medium leading-[56px] text-white desk:text-[76px] desk:leading-[76px]">
          {heading[0]}
          <i>{heading[1]}</i>
          {heading[2]}
        </h1>

        <p className="text-[16px] font-normal leading-[24px] text-white">{intro}</p>

        {/* Rows 77px tall with a 1px rule, 24px apart. */}
        <nav className="flex w-full flex-col gap-[24px]">
          {rows.map((row) => (
            <a
              key={row.number}
              href={row.href}
              className="group flex h-[62px] w-full items-center border-b border-white transition-colors duration-300 tab:h-[77px]"
            >
              <h3 className="text-[20px] font-medium leading-[26px] text-white/48">
                {row.number}
              </h3>
              <h2 className="ml-[16px] text-[28px] font-medium leading-[36px] text-white transition-colors duration-300 group-hover:text-dsg-ink-strong tab:text-[40px] tab:leading-[48px]">
                {row.label}
              </h2>
              <span className="ml-auto flex items-center justify-center text-white">
                <ArrowUpRightIcon width={40} height={40} />
              </span>
            </a>
          ))}
        </nav>

        <a
          href={cta.href}
          className={cn(
            "inline-block self-start rounded-[200px] border-[2px] border-white bg-transparent",
            "px-[32px] py-[16px] text-center text-[16px] font-medium leading-[19.2px] text-white",
            "transition-colors duration-300 hover:bg-white hover:text-dsg-orange",
          )}
        >
          {cta.label}
        </a>
      </div>
    </aside>
  );
}
