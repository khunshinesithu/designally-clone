"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";

import type { DsgHeroSlide } from "@/types/designally";
import { cn } from "@/lib/utils";

/**
 * One slide of the hero carousel: the base video slide plus the headline that
 * sits beneath it and the href its own (active) client label points at.
 */
interface HeroShowcaseSlide extends DsgHeroSlide {
  /** Serif headline rendered on the left of the caption row. */
  headline: string;
  /** Destination of this client's label while its slide is the active one. */
  activeHref: string;
  /** Destination of this client's label while another slide is active. */
  inactiveHref: string;
}

const VIDEO_BASE = "/sites/designally-co-e422ade5/root-8a5edab2/videos";

const SLIDES: readonly HeroShowcaseSlide[] = [
  {
    client: "Bitazza",
    videoSrc: `${VIDEO_BASE}/INTRO-Bitazza.mp4`,
    headline: "Your Creative Design Ally.",
    activeHref: "https://designally.co/works/bitazza-design-support-and-website/",
    inactiveHref: "https://designally.co/works/long-term-trusted-design-partner/",
  },
  {
    client: "INN News",
    videoSrc: `${VIDEO_BASE}/Intro-LOGO-INN-News.mp4`,
    headline: "Transforming Brands Through Design.",
    activeHref:
      "https://designally.co/works/inn-news-rebranding-and-website-projects/",
    inactiveHref:
      "https://designally.co/works/revitalizing-innnews-a-comprehensive-rebranding-journey/",
  },
  {
    client: "Nourigo",
    videoSrc: `${VIDEO_BASE}/Intro-VDO-NouriGo.mp4`,
    headline: "Simplifying Design, Amplifying Impact.",
    activeHref:
      "https://designally.co/works/nourigo-supplements-branding-project/",
    inactiveHref:
      "https://designally.co/works/crafting-a-compelling-brand-identity-for-supplementary-smoothies/",
  },
  {
    client: "Laga",
    videoSrc: `${VIDEO_BASE}/Intro-LAGA.mp4`,
    headline: "Crafting Foundation for Lasting Brand Success.",
    activeHref: "https://designally.co/works/laga-branding-and-website-project/",
    inactiveHref:
      "https://designally.co/works/lagas-eco-friendly-brand-journey-from-inception-to-launch/",
  },
];

/** Swiper `autoplay.delay` read from the live instance. */
const AUTOPLAY_DELAY = 10000;
/** Swiper `spaceBetween`, in px — also the flex gap of the track. */
const SPACE_BETWEEN = 40;

/**
 * Hero video carousel — the Elementor nested carousel at the top of
 * designally.co. Four looping slides advance every 10s with a 500ms slide
 * transition; the client labels double as go-to-slide controls.
 */
export function HeroShowcase() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay. Keyed on `index` so a click restarts the 10s cadence rather than
  // disabling it (Swiper: autoplay.disableOnInteraction === false).
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [index]);

  const handleLabelClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, target: number) => {
      // The live inline script: an already-active label navigates normally,
      // any other label moves the carousel instead.
      if (target === index) return;
      event.preventDefault();
      goTo(target);
    },
    [goTo, index],
  );

  return (
    <section className="relative flex w-full flex-col">
      <div className="dsg-container flex flex-col gap-[20px]">
        <div
          className="relative z-[1] overflow-hidden"
          aria-roledescription="carousel"
          aria-label="Featured work"
        >
          <div
            className="flex flex-row gap-[40px] transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(calc(${index} * -1 * (100% + ${SPACE_BETWEEN}px)), 0, 0)`,
            }}
          >
            {SLIDES.map((slide, slideIndex) => (
              <div
                key={slide.client}
                className="w-full shrink-0 grow-0 basis-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${SLIDES.length}`}
                aria-hidden={slideIndex !== index}
              >
                <div className="flex flex-col gap-[40px]">
                  <div className="aspect-[1069/702] w-full overflow-hidden rounded-[48px] transition-opacity duration-1000 desk:aspect-auto desk:h-[702px]">
                    <video
                      className="h-full w-full object-cover"
                      src={slide.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  </div>

                  <div className="flex flex-col gap-[8px] desk:h-[41.602px] desk:flex-row desk:items-start desk:justify-between desk:gap-0">
                    <h1 className="font-serif text-[32px] font-medium leading-[41.6px] text-dsg-ink-strong">
                      {slide.headline}
                    </h1>

                    <div className="flex flex-row flex-wrap items-center gap-[16px] desk:flex-nowrap desk:justify-end">
                      {SLIDES.map((label, labelIndex) => (
                        <div
                          key={label.client}
                          className="flex flex-row items-center gap-[16px]"
                        >
                          {labelIndex > 0 ? (
                            <span
                              aria-hidden="true"
                              className="inline-block w-[8.57px] font-sans text-[18px] font-normal leading-[21.6px] text-dsg-ink-strong"
                            >
                              /
                            </span>
                          ) : null}
                          <a
                            href={
                              labelIndex === slideIndex
                                ? label.activeHref
                                : label.inactiveHref
                            }
                            onClick={(event) =>
                              handleLabelClick(event, labelIndex)
                            }
                            aria-current={
                              labelIndex === index ? "true" : undefined
                            }
                            tabIndex={slideIndex === index ? undefined : -1}
                            className={cn(
                              "inline-block bg-transparent text-center font-sans text-[18px] leading-[21.6px] text-dsg-ink-strong transition-colors duration-300 hover:text-dsg-orange",
                              labelIndex === index
                                ? "font-semibold"
                                : "font-normal",
                            )}
                          >
                            {label.client}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
