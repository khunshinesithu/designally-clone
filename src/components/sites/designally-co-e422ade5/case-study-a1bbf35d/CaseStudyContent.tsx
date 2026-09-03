/**
 * designally.co project case-study detail page — the body of /works/<slug>/.
 *
 * One Elementor `single-post` template drives all six projects, so this is one
 * component rendered six times from the CMS rather than six pages.
 *
 * Four sections, measured on the live Skytower page at 1440x900 (1425px content
 * width after the scrollbar):
 *
 *   hero     y=0     h=900   full-bleed background video, no text over it
 *   intro    y=900   h=1225  1200px centred, prose left (728px) / meta right (300px)
 *   gallery  y=2125  h=3563  full-bleed, edge to edge, no padding and no gaps
 *   next up  y=5688  h=845   centred label, 1200px banner
 *
 * The gallery deliberately breaks out of the page container: rows sit at x=0
 * and span the full 1425px, one image filling the row or two at 713px each,
 * square-cropped. That is `is-cropped` on the WordPress block gallery, so the
 * source aspect ratio is discarded — hence `object-cover` on a square box.
 */

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { CaseStudyDetailView } from "@/sanity/lib/content";

/** Matches the 1200px box /works/ uses, so the two pages line up at x=113. */
const CONTAINER = "mx-auto w-full max-w-[1280px] px-[24px] tab:px-[40px]";

/**
 * The hero is a muted, looping YouTube background — Elementor's
 * `background_background: "video"`. Autoplay requires `mute=1`; `playsinline`
 * stops iOS taking it fullscreen. It is decorative, so it is hidden from
 * assistive tech and carries no controls.
 *
 * The iframe is deliberately oversized (177.78vh wide at minimum) and centred:
 * a 16:9 video in a 900px band would otherwise letterbox. This reproduces the
 * cover-fit Elementor does with its own sizing logic.
 */
function HeroVideo({ url, client }: { url: string | null; client: string }) {
  const id = url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1];

  return (
    <section
      aria-label={`${client} project showreel`}
      className="relative h-[420px] w-full overflow-hidden bg-dsg-ink-strong tab:h-[640px] desk:h-[900px]"
    >
      {id ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1`}
          title={`${client} showreel`}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0",
            // Cover the band whichever way it is constrained.
            "h-[56.25vw] min-h-full w-[177.78vh] min-w-full",
          )}
        />
      ) : null}
    </section>
  );
}

/** Label above value, the label in orange caps. Four of these stack. */
function MetaRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="mt-[28px] first:mt-0">
      <h3 className="text-[16px] font-bold leading-[19px] tracking-[0.02em] text-dsg-orange uppercase">
        {label}
      </h3>
      <h3 className="mt-[8px] text-[16px] font-normal leading-[24px] text-dsg-ink">{value}</h3>
    </div>
  );
}

export function CaseStudyContent({ study }: { study: CaseStudyDetailView }) {
  return (
    <>
      <HeroVideo url={study.heroVideoUrl} client={study.client} />

      {/* Intro — prose left, About Project / What We Did right. */}
      <section className={cn(CONTAINER, "py-[80px] tab:py-[120px] desk:py-[160px]")}>
        <div className="flex flex-col gap-[64px] desk:flex-row desk:gap-[160px]">
          <div className="w-full desk:max-w-[728px]">
            <h2 className="text-[20px] font-semibold leading-[26px] text-dsg-orange">
              {study.client}
            </h2>
            <h1 className="mt-[24px] font-serif text-[40px] font-medium leading-[1.2] text-dsg-ink-strong tab:text-[52px] desk:text-[64px] desk:leading-[77px]">
              {study.title}
            </h1>
            {study.body.map((para) => (
              <p key={para.slice(0, 48)} className="mt-[24px] text-[16px] leading-[24px] text-dsg-ink">
                {para}
              </p>
            ))}
            {study.visitHref ? (
              <a
                href={study.visitHref}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-[40px] inline-block text-[16px] font-medium leading-[19px] text-dsg-orange underline-offset-4 hover:underline"
              >
                {study.visitLabel ?? "Visit website"}
              </a>
            ) : null}
          </div>

          {/* Measured 300px wide, its heading indented 26px past the values. */}
          <aside className="w-full desk:w-[300px] desk:shrink-0">
            <h3 className="pl-[26px] text-[20px] font-medium leading-[26px] text-dsg-ink-strong">
              About Project
            </h3>
            <div className="mt-[36px]">
              <MetaRow label="Client" value={study.client} />
              <MetaRow label="Industry" value={study.industry} />
              <MetaRow label="Service" value={study.services} />
              <MetaRow label="Duration" value={study.duration} />
            </div>

            {study.tags.length > 0 ? (
              <>
                <h3 className="mt-[100px] pl-[26px] text-[20px] font-medium leading-[26px] text-dsg-ink-strong">
                  What We Did
                </h3>
                <ul className="mt-[36px] flex flex-wrap gap-[8px]">
                  {study.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-[200px] border border-dsg-orange bg-white px-[16px] py-[8px] text-[16px] leading-[24px] text-dsg-ink"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </aside>
        </div>
      </section>

      {/* Gallery — full-bleed, no gaps, square crops. */}
      <section className="w-full">
        {study.gallery.map((block, i) =>
          block.kind === "video" ? (
            <video
              key={`v-${i}`}
              src={block.src}
              width={block.width || undefined}
              height={block.height || undefined}
              autoPlay
              loop
              muted
              playsInline
              // Decorative loops with no audio track and no controls.
              aria-hidden
              className="block w-full"
            />
          ) : (
            <div
              key={`g-${i}`}
              className={cn("grid", block.images.length === 1 ? "grid-cols-1" : "grid-cols-2")}
            >
              {block.images.map((img) => (
                <div key={img.src} className="relative aspect-square w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={block.images.length === 1 ? "100vw" : "50vw"}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ),
        )}
      </section>

      {/*
        Next up. The banner tucks under the CTA's wave: the live section is
        `padding: 160px 0 0` with `margin-bottom: -160px`, and the 160px-tall
        wave sits on top of the overlap.
      */}
      {study.nextUp ? (
        <section className={cn(CONTAINER, "-mb-[160px] pt-[80px] pb-[80px] desk:pt-[160px]")}>
          <h2 className="text-center text-[20px] font-semibold leading-[26px] text-dsg-orange">
            Next up
          </h2>
          <Link href={`/works/${study.nextUp.slug}/`} className="group block">
            <h2 className="mt-[8px] text-center font-serif text-[44px] font-medium leading-[1.3] text-dsg-ink-strong transition-colors duration-300 group-hover:text-dsg-orange desk:text-[64px] desk:leading-[83px]">
              {study.nextUp.client}
            </h2>
            {study.nextUp.image ? (
              <div className="relative mt-[88px] aspect-[3/1] w-full overflow-hidden">
                <Image
                  src={study.nextUp.image.src}
                  alt={study.nextUp.image.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            ) : null}
          </Link>
        </section>
      ) : null}
    </>
  );
}
