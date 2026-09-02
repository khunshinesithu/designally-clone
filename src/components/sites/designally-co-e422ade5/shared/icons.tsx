/**
 * SVG icons extracted verbatim from designally.co.
 *
 * Every path below is copied from the live site's inline SVG — no redraws.
 * Colour is driven by `fill`/`stroke` = `currentColor` where the site drives it
 * from CSS, and left hard-coded where the source hard-codes it (the double
 * chevron is a fixed two-tone orange mark).
 *
 * Large decorative artwork (the DESIGNALLY wordmark, the works illustration and
 * the CTA duck) is too big to inline usefully and lives in
 * `public/sites/designally-co-e422ade5/shared/svg/` — reference those with next/image.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

/**
 * Circular "D" monogram used by the floating header.
 * Source: 56×56 viewBox, rendered at 52×52. On the live site CSS sets
 * `fill: rgb(245, 99, 65)`, which overrides the path's `fill="white"` attribute —
 * the result is a solid orange disc with the D counter knocked out.
 */
export function DMonogramIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M27.9958 0C12.5366 0 0 12.5334 0 27.9979C0 43.4624 12.5366 56 27.9958 56C43.455 56 56 43.4624 56 27.9979C56 12.5334 43.4634 0 27.9958 0ZM40.5366 40.9061C36.9319 44.5111 32.5902 46.3136 27.5073 46.3136L19.7545 46.4147H19.704C18.8786 46.4147 18.1669 46.1241 17.569 45.5429C16.9668 44.9407 16.6636 44.2163 16.6636 43.3782V12.5502C16.6636 11.7079 16.9668 10.9877 17.569 10.3855C18.1501 9.80432 18.8618 9.50951 19.704 9.50951H27.5073C32.5902 9.50951 36.9319 11.3078 40.5366 14.896C44.1245 18.4968 45.9185 22.8346 45.9185 27.8968C45.9185 32.959 44.1245 37.3179 40.5366 40.9061Z" />
    </svg>
  );
}

/**
 * Diagonal ↗ arrow on each numbered service row.
 * Source: 24×24 viewBox, rendered at 40×40, `stroke-width: 1.5`.
 * The site paints it white over the orange panel via CSS.
 */
export function ArrowUpRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 19L19 6M19 6V18.48M19 6H6.52"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Two-tone "))" eyebrow mark shown before section labels such as "BRANDING".
 * Source: 18×40 viewBox, rendered at 11×24. Both fills are hard-coded on the
 * live site (#F78267 behind, #F56341 in front) — not CSS-driven.
 */
export function DoubleChevronIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="40"
      viewBox="0 0 18 40"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9 39.5L9 0.5C14.521 5.25546 18 12.2282 18 19.9967C18 27.7653 14.521 34.7413 9 39.5Z"
        fill="#F78267"
      />
      <path
        d="M-7.5107e-07 39.5L9.53674e-07 0.5C5.52098 5.25546 9 12.2282 9 19.9967C9 27.7653 5.52098 34.7413 -7.5107e-07 39.5Z"
        fill="#F56341"
      />
    </svg>
  );
}

/**
 * Elementor top shape divider on the orange CTA section.
 * `preserveAspectRatio="none"` is required — the shape stretches to the section width.
 */
export function CtaWaveShape({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Hand-drawn loop that circles the CTA headline.
 * Stroked, not filled — the source has no fill on the path.
 */
export function ScribbleUnderline({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
      />
    </svg>
  );
}

/**
 * Hamburger inside the floating header's circular toggle.
 * The live site uses the Elementor icon font glyph `eicon-menu-bar` at 24px in
 * a 51×51 circle with a 1.5px orange border. Redrawn as three 24×24 bars so the
 * clone carries no icon-font dependency.
 */
export function MenuBarsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Close (×) glyph that replaces the hamburger while the dropdown is open. */
export function CloseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
