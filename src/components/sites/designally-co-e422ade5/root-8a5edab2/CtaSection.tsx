import { cn } from "@/lib/utils";

import { CtaWaveShape, ScribbleUnderline } from "../shared/icons";

const DUCK_SRC = "/sites/designally-co-e422ade5/shared/svg/duck.svg";

type BrandIconProps = React.SVGProps<SVGSVGElement>;

/**
 * LINE — simplified speech-bubble mark.
 * The live site renders Font Awesome 5 Brands `fa-line`; this is an inline
 * redraw so the clone carries no icon-font dependency.
 */
function LineIcon(props: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C6.201 2 1.5 5.79 1.5 10.465c0 4.19 3.728 7.699 8.764 8.364.341.073.806.225.923.516.106.264.069.677.034.944l-.148.888c-.045.263-.209 1.029.902.561 1.111-.468 5.994-3.529 8.178-6.043h-.001C21.66 14.04 22.5 12.36 22.5 10.465 22.5 5.79 17.799 2 12 2Z" />
    </svg>
  );
}

/** Facebook — standard circular "f" mark. */
function FacebookIcon(props: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
    </svg>
  );
}

/** Instagram — rounded square, lens and flash dot. Stroked, so it stays legible at 34px. */
function InstagramIcon(props: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="2.25"
        y="2.25"
        width="19.5"
        height="19.5"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.7" cy="6.3" r="1.25" fill="currentColor" />
    </svg>
  );
}

/** Pinterest — standard circular "P" mark. */
function PinterestIcon(props: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
    </svg>
  );
}

/** Spotify — standard circular mark with the three arcs. */
function SpotifyIcon(props: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
    </svg>
  );
}

type SocialLink = {
  href: string;
  label: string;
  /** Measured rendered glyph size in px. */
  size: number;
  Icon: (props: BrandIconProps) => React.JSX.Element;
};

/** The five brand links, in source order, with their measured glyph sizes. */
const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "https://line.me/ti/p/%40designally",
    label: "LINE",
    size: 34,
    Icon: LineIcon,
  },
  {
    href: "https://www.facebook.com/designallyco",
    label: "Facebook",
    size: 32,
    Icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/designally.co",
    label: "Instagram",
    size: 34,
    Icon: InstagramIcon,
  },
  {
    href: "https://www.pinterest.com/Designallyco/",
    label: "Pinterest",
    size: 32,
    Icon: PinterestIcon,
  },
  {
    href: "https://open.spotify.com/user/p4985b7mufaslr8c1cborig78",
    label: "Spotify",
    size: 32,
    Icon: SpotifyIcon,
  },
];

/**
 * CtaSection — designally.co `.elementor-element-1caafeb`.
 *
 * The full-bleed orange closing block: a white wave divider along the top edge,
 * centred copy, a phone link circled by a hand-drawn scribble, a row of social
 * icons and the duck illustration flush with the container's bottom-left.
 *
 * Nothing here animates on scroll and there is no client state — link hovers are
 * pure CSS, so this stays a server component.
 *
 * Stacking: the live site puts the shape divider at `z-index: -1`. Reproduced
 * literally that would hide the wave, because `position: relative` with
 * `z-index: auto` does NOT open a stacking context — a negative-z descendant
 * would then paint *behind* the section's own orange background. Instead the
 * wave sits at `z-0` (above the section background, below everything else) and
 * the content column is lifted to `relative z-10`. Same visual result, no
 * dependency on an accidental stacking context.
 *
 * Widths in the spec (316.391 / 756.008 / 467.156px) are shrink-to-fit content
 * widths produced by `align-items: center` on the flex column, not authored
 * sizes — so they are intentionally left to the intrinsic text width here.
 */
export function CtaSection() {
  return (
    <section className="relative flex w-full flex-col bg-dsg-orange font-sans">
      {/* Top shape divider. `rotate-180` reproduces matrix(-1, 0, 0, -1, 0, 0);
          the white fill masks the orange so the top edge reads as a white wave
          curving down into the section. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-[-1px] z-0 rotate-180",
          "h-[80px] text-white tab:h-[120px] desk:h-[160px]",
        )}
      >
        <CtaWaveShape className="block h-full w-full" />
      </div>

      <div
        className={cn(
          "dsg-container relative z-10 flex flex-col items-center",
          "pt-[96px] pb-0 tab:pt-[120px] desk:pt-[160px]",
        )}
      >
        <h2 className="m-0 text-center text-[16px] font-normal leading-[24px] text-white">
          Open a new perspective for your brand.
        </h2>

        <h1
          className={cn(
            "m-0 text-center font-serif font-medium text-white",
            "text-[40px] leading-[48px]",
            "tab:text-[64px] tab:leading-[77px]",
            "desk:text-[96px] desk:leading-[115.2px]",
          )}
        >
          Let&rsquo;s work toge<i>t</i>her.
        </h1>

        {/* Phone link + scribble. The wrapper shrink-wraps the link text, so the
            scribble's -10px horizontal inset and 147% height (75.898 / 51.6)
            keep it looped around the text at every font size. */}
        <div className="relative mt-[8px] mb-[16px] inline-block">
          <ScribbleUnderline
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-[-10px] left-[-10px] h-[147%] -translate-y-1/2 text-dsg-ink"
          />
          <a
            href="tel:0650055993"
            className={cn(
              "relative block text-center font-medium whitespace-nowrap text-dsg-ink no-underline",
              "text-[26px] leading-[31.2px]",
              "tab:text-[32px] tab:leading-[38.4px]",
              "desk:text-[43px] desk:leading-[51.6px]",
              "transition-colors duration-300 hover:text-white focus-visible:text-white",
            )}
          >
            Click to Connect !
          </a>
        </div>

        {/* Social row — measured ~130px below the phone link (16px of that is the
            link's own bottom margin). */}
        <ul className="m-0 flex list-none items-center justify-center gap-[16px] p-0 mt-[114px] tab:gap-[20px]">
          {SOCIAL_LINKS.map(({ href, label, size, Icon }) => (
            <li key={href} className="flex">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center text-white transition-colors duration-300 hover:text-dsg-ink focus-visible:text-dsg-ink"
              >
                <Icon width={size} height={size} className="block" />
              </a>
            </li>
          ))}
        </ul>

        {/* Duck — flush with the container's left edge, below the social row.
            `self-start` opts out of the column's `items-center`. Plain <img>:
            next/image will not optimise an SVG without `dangerouslyAllowSVG`. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DUCK_SRC}
          alt=""
          width={120}
          height={121}
          aria-hidden="true"
          className="mt-[24px] block h-[81px] w-[80px] self-start desk:h-[121px] desk:w-[120px]"
        />
      </div>
    </section>
  );
}
