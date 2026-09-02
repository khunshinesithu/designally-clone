import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const IMAGE_BASE = "/sites/designally-co-e422ade5/root-8a5edab2/images";

/** Inline colour used by the three highlighted words in the headline. */
const ORANGE = "#F56341";

/**
 * IntroSection — designally.co `.elementor-element-7f149c2`.
 *
 * Static section: a left copy column (logo, headline, paragraph, pill button)
 * beside a right column holding the cog illustration. The only interaction is
 * the button's CSS hover, so this stays a server component.
 *
 * Column widths are the measured pixel widths expressed as a share of the
 * `.dsg-container` inner width (1068.75px at a 1425px content box), so the two
 * columns keep their exact proportions at every viewport:
 *   left  630.766 / 1068.75 = 59.0187%
 *   right 317.984 / 1068.75 = 29.7529%
 * The remaining 11.23% is the gutter, reproduced with `justify-between`. The
 * right column is 195.632px shorter than the left, so `items-center` lands it
 * the measured ~98px below the left column's top edge.
 */
export function IntroSection() {
  return (
    <section className="relative flex w-full flex-col py-[160px] font-sans">
      <div
        className={cn(
          "dsg-container flex flex-col gap-[40px]",
          "tab:flex-row tab:items-center tab:justify-between tab:gap-0",
        )}
      >
        {/* Left column — 630.766 x 402.898 at 1440. Gap 24px between every child;
            the paragraph adds its own 14.4px bottom margin on top of that. */}
        <div className="flex w-full flex-col gap-[24px] tab:w-[59.0187%]">
          <Image
            src={`${IMAGE_BASE}/Designally-Primary-Logo.png`}
            alt=""
            width={800}
            height={187}
            priority
            className="h-[44.492px] w-[190px] max-w-full"
          />

          <h1 className="m-0 text-[32px] font-medium leading-[41.6px] text-dsg-ink-strong">
            We are your creative partner—ready to build{" "}
            <span style={{ color: ORANGE }}>brands</span>,{" "}
            <span style={{ color: ORANGE }}>websites</span> and{" "}
            <span style={{ color: ORANGE }}>{"creative assets "}</span>
            that elevate your business.
          </h1>

          <p className="mt-0 mb-[14.4px] w-full text-[16px] font-normal leading-[24px] text-dsg-ink-strong tab:w-[592px] tab:max-w-full">
            At Designally, we create strong foundations for brands through
            thoughtful design. Our work helps businesses grow with clarity and
            consistency, ensuring your brand communicates confidently,
            meaningfully, and memorably to the right audience.
          </p>

          <Link
            href="/about/"
            className={cn(
              "inline-block self-start rounded-[200px] border-none px-[32px] py-[16px]",
              "text-center text-[16px] font-medium leading-[19.2px] text-white no-underline",
              "bg-dsg-orange transition-colors duration-300 ease-in-out",
              "hover:bg-dsg-orange-light focus-visible:bg-dsg-orange-light",
            )}
          >
            Explore More
          </Link>
        </div>

        {/* Right column — 317.984 x 207.266 at 1440, vertically centred on the row */}
        <div className="flex w-full flex-col items-center gap-[20px] tab:w-[29.7529%]">
          {/* Plain <img>: the source asset is an SVG, which next/image will not
              optimise without `dangerouslyAllowSVG`. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMAGE_BASE}/Cog_Designally.svg`}
            alt=""
            width={382}
            height={249}
            className="h-auto w-full max-w-[317.984px]"
          />
        </div>
      </div>
    </section>
  );
}
