import Image from "next/image";

/**
 * The boat and the line it trails down the /services/ process section.
 *
 * One asset on the live page — `ship_withline.svg`, 483 x 2092 — holding the
 * boat (a 512x512 PNG carried in a `<pattern>`), the three small birds and the
 * long `#F9A18D` line. Rendered 392 x 1700 at `z-index: 99`, its left edge at
 * x=327 of the 1425px viewport and its top 152px above the process section, so
 * the boat sits on the orange panel's bottom edge and the line runs down past
 * the DIVE and DEFINE rows.
 *
 * Rebuilding the paths by hand would drop the boat, which lives in the pattern
 * rather than in a `<path>`.
 *
 * `unoptimized` because this is an SVG: the image optimizer refuses SVG unless
 * `dangerouslyAllowSVG` is set, and there is nothing to optimise here anyway.
 */
export function ProcessLine({ className }: { className?: string }) {
  return (
    <Image
      src="/sites/designally-co-e422ade5/services-eeda784a/images/ship_withline.svg"
      alt=""
      aria-hidden="true"
      width={483}
      height={2092}
      unoptimized
      className={className}
    />
  );
}
