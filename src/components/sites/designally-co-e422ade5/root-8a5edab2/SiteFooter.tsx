import Link from "next/link";

import { cn } from "@/lib/utils";

/** Shared type ramp for every string in the bar — 16px / 24px Poppins, white. */
const FOOTER_TEXT = "text-[16px] font-normal leading-[24px] text-white";

/**
 * SiteFooter — designally.co `.elementor-element-ae4d07f`.
 *
 * A single thin orange bar closing the page. It reuses the CTA section's
 * `#F56341`, so the two read as one continuous block.
 *
 * Layout is the measured one: a 16px-padded `.dsg-container` row with the
 * copyright pinned left and the three legal spans pinned right. The measured
 * rects at 1440 put PRIVACY POLICY at x931→1056, "/" at 1072→1080 and
 * TERMS OF SERVICES at 1096→1247 (the container's right edge), i.e. a flat
 * 16px between each item — reproduced with `gap-[16px]`.
 *
 * The live element carries `margin-bottom: -30px`, which pulls the bar up into
 * the trailing whitespace of the WordPress build. That is deliberately NOT
 * reproduced: here the footer is the last element on the page, so a negative
 * bottom margin would only leave a scroll artifact. Margin stays 0.
 *
 * Link hover is the only interaction, so this stays a server component.
 */
export function SiteFooter() {
  return (
    <footer className="relative m-0 flex w-full flex-col bg-dsg-orange font-sans tab:h-[57px]">
      <div
        className={cn(
          "dsg-container flex flex-col items-center gap-[8px] py-[16px]",
          "tab:h-[56px] tab:flex-row tab:items-center tab:justify-between tab:gap-0",
        )}
      >
        {/* Left — plain text, not a link. 359.906 x 24 at 1440. */}
        <p className={cn("m-0 text-center tab:text-start", FOOTER_TEXT)}>
          © 2023 Designally Co., Ltd. All Rights Reserved
        </p>

        {/* Right — three spans on one line, right-aligned, 16px apart. */}
        <div className="flex flex-row items-center gap-[16px] text-end">
          <Link
            href="/privacy-policy"
            className={cn(
              FOOTER_TEXT,
              "no-underline transition-colors duration-300 hover:text-dsg-ink focus-visible:text-dsg-ink",
            )}
          >
            PRIVACY POLICY
          </Link>

          {/* Separator — a plain span, never a link, and inert on hover. */}
          <span className={FOOTER_TEXT} aria-hidden="true">
            /
          </span>

          {/* Measured href: TERMS OF SERVICES points at /cookie-policy on the
              live site, not /terms-of-services. Reproduced as measured. */}
          <Link
            href="/cookie-policy"
            className={cn(
              FOOTER_TEXT,
              "no-underline transition-colors duration-300 hover:text-dsg-ink focus-visible:text-dsg-ink",
            )}
          >
            TERMS OF SERVICES
          </Link>
        </div>
      </div>
    </footer>
  );
}
