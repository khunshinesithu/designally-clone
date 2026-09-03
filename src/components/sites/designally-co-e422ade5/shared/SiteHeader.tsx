import type { DsgNavItem } from "@/types/designally";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * designally.co — in-flow page header (Elementor `.elementor-element-12a5b5d`,
 * "header-1"). Static server component: the only behaviour is CSS hover.
 *
 * It is NOT sticky — it scrolls away with the page. The live DOM carries
 * `margin-top: -146px` purely to cancel the spacer Elementor injects for its
 * separate floating sticky header; this clone renders that floating header as a
 * pure overlay with no spacer, so the margin here is 0.
 *
 * Layout at >= 1025px (measured at a 1425px content width):
 *   .dsg-container (1068.75px) = logo 25% (267.188) + nav 50% (534.375) + contact 25% (267.188)
 * Each block is `flex-direction: column; justify-content: center`, so the block
 * cross-axis alignment is what positions the content horizontally:
 * logo `flex-start` (flush left), nav `center`, contact `flex-end` (flush right).
 */

const WORDMARK_SRC = "/sites/designally-co-e422ade5/shared/svg/designally-wordmark.svg";

/** Rendered wordmark box: 214.398 x 20 out of the source viewBox "0 0 536 50". */
const WORDMARK_WIDTH = "214.398px";

/**
 * Internal hrefs are relative so navigation stays inside the clone. The live site
 * uses absolute `https://designally.co/...` URLs here; every one of these paths now
 * has a local route, so keeping them absolute would walk the visitor off the clone.
 */
const NAV_ITEMS: readonly DsgNavItem[] = [
  { label: "SERVICES", href: "/services/" },
  { label: "WORKS", href: "/works/" },
  { label: "ABOUT", href: "/about/" },
  { label: "THOUGHTS", href: "/thoughts/" },
];

/** Which nav entry renders in the active orange state, keyed by href. */
export type DsgActiveNav =
  | "/services/"
  | "/works/"
  | "/about/"
  | "/thoughts/"
  | "/contact-us/"
  | undefined;

const CONTACT_ITEM: DsgNavItem = { label: "CONTACT US", href: "/contact-us/" };

/**
 * The extracted wordmark asset carries no `fill` attribute — on the live site the
 * colour comes from CSS (`fill: rgb(245, 99, 65)`) applied to the inlined SVG. An
 * `<img>` cannot be styled from the host document, so the mark is painted as a
 * brand-orange fill masked by the very same external SVG file. Same asset, same
 * measured colour, no inlined path data.
 */
const WORDMARK_MASK: React.CSSProperties = {
  maskImage: `url("${WORDMARK_SRC}")`,
  WebkitMaskImage: `url("${WORDMARK_SRC}")`,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
};

export interface SiteHeaderProps {
  className?: string;
  /**
   * The current page. On the live site the matching nav item carries
   * `elementor-item-active` and renders rgb(245, 99, 65) rather than rgb(33, 33, 33).
   * `/` passes nothing — the homepage is not in the nav, which is why this state
   * never appeared while only the homepage was cloned.
   */
  activeNav?: DsgActiveNav;
  /**
   * Float the header over the section below instead of sitting above it.
   *
   * The case-study detail pages open on a full-bleed video band that starts at
   * the very top of the page: the live site pulls its content wrapper up by
   * 131px so the 132px header overlaps it. Positioning the header absolutely is
   * the same result without the negative margin. Colours do not change — the
   * nav is rgb(33, 33, 33) and the wordmark rgb(245, 99, 65) here as everywhere.
   */
  overlay?: boolean;
}

export function SiteHeader({ className, activeNav, overlay = false }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "z-[999] flex w-full flex-col bg-transparent",
        overlay ? "absolute inset-x-0 top-0" : "relative",
        "[transition:background_0.3s,border_0.3s,box-shadow_0.3s,transform_0.4s]",
        className,
      )}
    >
      {/*
        The mobile padding is the header's own: the live bar is 70px tall with
        the wordmark at y=28, where the 51px logo row alone would make 51.
      */}
      <div className="dsg-container flex flex-row pt-[12px] pb-[7px] tab:py-[24px] desk:py-[40px]">
        {/* Logo — 25% column, content flush left, vertically centred. */}
        <div className="flex h-[51.203px] w-auto shrink-0 flex-col items-start justify-center desk:w-1/4">
          <Link
            href="/"
            aria-label="DESIGNALLY"
            className="inline-block h-[20px] w-[214.398px] transition-all duration-300"
          >
            <span
              aria-hidden="true"
              className="block h-[20px] bg-dsg-orange"
              style={{ ...WORDMARK_MASK, width: WORDMARK_WIDTH }}
            />
          </Link>
        </div>

        {/* Primary nav — 50% column. Hidden below 1025px (tablet + mobile). */}
        <nav
          aria-label="Primary"
          className="hidden h-[51.203px] w-1/2 flex-col items-center justify-center desk:flex"
        >
          <ul className="flex h-[51.203px] justify-between">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="mx-[20px] flex">
                <a
                  href={item.href}
                  aria-current={item.href === activeNav ? "page" : undefined}
                  className={cn(
                    "flex items-center py-[16px] font-sans text-[16px] font-medium",
                    "uppercase leading-[19.2px]",
                    "transition-colors duration-[400ms] hover:text-dsg-orange focus-visible:text-dsg-orange",
                    item.href === activeNav ? "text-dsg-orange" : "text-dsg-ink-strong",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CONTACT US — 25% column, content flush right. Hidden at <= 767px. */}
        <div className="ml-auto hidden h-[51.203px] w-auto shrink-0 flex-col items-end justify-center tab:flex desk:ml-0 desk:w-1/4">
          <a
            href={CONTACT_ITEM.href}
            className={cn(
              "inline-block rounded-[200px] border border-solid border-dsg-orange",
              "bg-transparent px-[32px] py-[12px] text-center",
              "font-sans text-[16px] font-medium leading-[19.2px] text-dsg-orange",
              "transition-colors duration-300",
              "hover:bg-dsg-orange hover:text-white focus-visible:bg-dsg-orange focus-visible:text-white",
            )}
          >
            {CONTACT_ITEM.label}
          </a>
        </div>
      </div>
    </header>
  );
}
