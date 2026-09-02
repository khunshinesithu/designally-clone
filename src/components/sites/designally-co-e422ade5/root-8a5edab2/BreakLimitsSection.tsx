import { cn } from "@/lib/utils";

/**
 * BreakLimitsSection — designally.co `.elementor-element-9522506`.
 *
 * Purely typographic band: two small Poppins notes pinned to the container's
 * left and right edges, wrapped around four huge EB Garamond display lines
 * whose alignment alternates centre / left / right / centre.
 *
 * The source element carries an Elementor motion-effect attribute, but the
 * effect's speed is 0 and the measured transform is the identity matrix at
 * every scroll position tested (0 / 600 / 1500 / 7600). There is no parallax,
 * so this is a static server component — no scroll listener, no motion
 * library, no `"use client"`.
 *
 * Geometry measured at 1440x900: section padding 160px 0 (height 872px);
 * `.dsg-container` 1068.75px wide (75% of the 1425px content box) with a 20px
 * column gap; each display line is a 712.5px block centred in that container,
 * i.e. 66.6667% of the container width — expressed as a percentage so the
 * blocks keep their exact proportion at every desktop width. The alternating
 * `text-align` is what shifts the text left and right *inside* those equal,
 * centred blocks; the container itself never changes alignment.
 */

/** Shared classes for the four display lines. 92px type at desk, 712.5px block. */
const DISPLAY_LINE = cn(
  "m-0 mx-auto w-full font-serif font-medium",
  // 38px mobile → 64px tablet → 92px desktop; line-height always equals font-size.
  "text-[38px] leading-[38px]",
  "tab:text-[64px] tab:leading-[64px]",
  "desk:text-[92px] desk:leading-[92px]",
  // 712.5px of the 1068.75px container at 1440 = 66.6667%.
  "desk:w-[66.6667%] desk:max-w-[712.5px]",
);

export function BreakLimitsSection() {
  return (
    <section className="relative z-0 flex w-full flex-col py-[80px] font-sans tab:py-[160px]">
      <div className="dsg-container flex flex-col gap-[20px]">
        {/* Top note — 213.75px x 48px, sits at the container's left edge. */}
        <p className="m-0 w-[213.75px] max-w-full text-left text-[16px] font-normal leading-[24px] text-dsg-ink-strong">
          Break the limits
          <br />
          of your brand.
        </p>

        {/* 1 — centred, ink. Note the single italic "a". */}
        <h1 className={cn(DISPLAY_LINE, "text-left text-dsg-ink-strong tab:text-center")}>
          Unlock br<i>a</i>nd
        </h1>

        {/* 2 — left, orange. */}
        <h1 className={cn(DISPLAY_LINE, "text-left text-dsg-orange")}>true potential</h1>

        {/* 3 — right, orange. */}
        <h1 className={cn(DISPLAY_LINE, "text-left text-dsg-orange tab:text-right")}>
          &amp; fuel positive
        </h1>

        {/* 4 — centred, ink. Single italic "a" again. */}
        <h1 className={cn(DISPLAY_LINE, "text-left text-dsg-ink-strong tab:text-center")}>
          tr<i>a</i>nsformation.
        </h1>

        {/* Bottom note — 137.234px x 48px (shrink-to-fit), pinned to the right edge. */}
        <p className="m-0 w-fit max-w-full self-end text-right text-[16px] font-normal leading-[24px] text-dsg-ink-strong">
          Take your brand
          <br />
          further than ever.
        </p>
      </div>
    </section>
  );
}
