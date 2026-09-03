import Image from "next/image";

import { cn } from "@/lib/utils";

import { ArrowUpRightIcon } from "../shared/icons";

/** The panel's four numbered rows, as measured on the live /services/ panel. */
const PANEL_ROWS: readonly { number: string; label: string; href: string }[] = [
  { number: "01", label: "Branding", href: "#Branding" },
  { number: "02", label: "Website Design", href: "#Website" },
  { number: "03", label: "Design Support", href: "#DesignAlly" },
  {
    number: "04",
    label: "Digital Brand Book",
    href: "https://designally.co/online-brand-guide/designally/",
  },
];

/**
 * designally.co /services/ — the three page-body sections, in live order:
 *
 *   1. Hero video band          `.elementor-element-2508f80` — 450px tall, 802px video
 *   2. Our Services             `.elementor-element-8f29021` — sticky orange panel + 5 cards
 *   3. DIVE process             `.elementor-element-9f58303` — 4 alternating icon/text rows
 *
 * Every value below is `getComputedStyle` / `getBoundingClientRect` output taken from the
 * live site at 1440x900 (1425px content width) and recorded in
 * docs/research/designally-co-e422ade5/services-eeda784a/extract-services-page.json.
 *
 * This page's container is `max-width: 1200px` centred — NOT the 75% `.dsg-container`
 * the homepage sections use. Do not swap one for the other.
 *
 * Static throughout: the sticky panel and the looping video are both declarative, so no
 * `"use client"` boundary is needed.
 */

const PAGE_IMAGES = "/sites/designally-co-e422ade5/services-eeda784a/images";
const PAGE_VIDEOS = "/sites/designally-co-e422ade5/services-eeda784a/videos";

/**
 * The five card images are the same uploads the homepage already downloaded, so this page
 * points at the homepage's copies rather than duplicating 5 files in the repo.
 */
const CARD_IMAGES = "/sites/designally-co-e422ade5/root-8a5edab2/images";

/* ------------------------------------------------------------------------------------ */
/* 1. Hero video band `2508f80`                                                          */
/* ------------------------------------------------------------------------------------ */

/**
 * A 450px band showing the middle slice of an 802px-tall video (802 / 450 = 178%), which
 * is `position: absolute` and vertically centred on the live site (`top: 50%` +
 * `translateY(-50%)`, measured at top 225px / y -178 against a section at y -2).
 *
 * The height is expressed as a percentage of the band so the same crop survives the two
 * smaller band heights below 1025px. The section is `overflow: hidden` here — the live
 * site leaves it `visible` and lets the video bleed over its neighbours, which is a bug
 * we do not reproduce.
 *
 * The live section also carries `margin-top: -134px`, which exists only to cancel the
 * spacer Elementor injects for its floating sticky header. This clone renders that header
 * as a pure overlay with no spacer, so the margin is 0 here (same call as `SiteHeader`).
 */
function ServicesHero() {
  return (
    <section
      aria-label="Designally showreel"
      className="relative h-[280px] w-full overflow-hidden tab:h-[380px] desk:h-[450px]"
    >
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute top-1/2 left-0 h-[178%] w-full -translate-y-1/2 object-cover"
      >
        <source src={`${PAGE_VIDEOS}/G-22.mp4`} type="video/mp4" />
      </video>
    </section>
  );
}

/* ------------------------------------------------------------------------------------ */
/* 2. Our Services `8f29021`                                                             */
/* ------------------------------------------------------------------------------------ */

/**
 * A card title, split around the one letter the live markup italicises — the house
 * treatment that also appears on the homepage (`Brand C<i>o</i>re`, `Our Serv<i>i</i>ces`).
 */
type ItalicTitle = readonly [before: string, italic: string, after: string];

interface ServicePageCard {
  eyebrow: string;
  title: ItalicTitle;
  /** The outlined pills under the title. The live cards carry these, not prose. */
  tags: readonly string[];
  image: string;
  /**
   * Space above this card, measured between the previous card's image bottom and this
   * card's eyebrow: 165, 164, 189, 189. Empty on the first card.
   */
  gapAboveClass: string;
  /**
   * Space between the description and the image. Hand-tuned per card on the live site
   * (264, 144, 144, 184, 144) to line the images up against the pinned panel, so it is
   * carried as data rather than derived.
   */
  imageGapClass: string;
}

/**
 * Class names are spelled out in full because Tailwind scans source text — an
 * interpolated `mt-[${n}px]` would never be generated.
 */
const SERVICE_CARDS: readonly ServicePageCard[] = [
  {
    eyebrow: "BRANDING",
    title: ["Brand C", "o", "re"],
    tags: [
      "Brand Audit",
      "Naming",
      "Tagline",
      "Brand Story",
      "Core Values, Vision, Mission",
      "Brand Archetype",
      "Brand Personality",
      "Brand Positioning",
      "Target Audience",
      "Brand Voice & Messaging",
      "Personas Development",
      "Value Proposition Analysis",
      "Stake Holder Mapping",
    ],
    image: `${CARD_IMAGES}/brandcore.jpg`,
    gapAboveClass: "",
    imageGapClass: "mt-[40px] tab:mt-[72px] desk:mt-[264px]",
  },
  {
    eyebrow: "BRANDING",
    title: ["Brand Vis", "u", "als"],
    tags: [
      "Logo Design",
      "Logo Guideline",
      "Color Scheme",
      "Typography",
      "Graphic Elements",
    ],
    image: `${CARD_IMAGES}/brandvisual.jpg`,
    gapAboveClass: "mt-[80px] tab:mt-[120px] desk:mt-[165px]",
    imageGapClass: "mt-[40px] tab:mt-[56px] desk:mt-[144px]",
  },
  {
    eyebrow: "BRANDING",
    title: ["Brand Execut", "i", "on"],
    tags: [
      "Collateral",
      "Social Media Template",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: `${CARD_IMAGES}/brandexc.jpg`,
    gapAboveClass: "mt-[80px] tab:mt-[120px] desk:mt-[164px]",
    imageGapClass: "mt-[40px] tab:mt-[56px] desk:mt-[144px]",
  },
  {
    eyebrow: "WEBSITE",
    title: ["Webs", "i", "te + Dev"],
    tags: [
      "Informative",
      "Corporate",
      "E-Commerce",
      "Company Profile",
      "Online Brand Guideline",
      "Booking Platform",
      "Web Application",
      "Sales Page",
      "Investor Relation",
    ],
    image: `${CARD_IMAGES}/website.jpg`,
    gapAboveClass: "mt-[80px] tab:mt-[120px] desk:mt-[189px]",
    imageGapClass: "mt-[40px] tab:mt-[56px] desk:mt-[184px]",
  },
  {
    // The eyebrow reads DESIGN SUPPORT but the title is "Design Ally" — measured as such,
    // and different from the homepage card, which is titled "Design Support".
    eyebrow: "DESIGN SUPPORT",
    title: ["Des", "i", "gn Ally"],
    tags: [
      "Design Outsourcing Service",
      "Graphic Design",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: `${CARD_IMAGES}/designsupport.jpg`,
    gapAboveClass: "mt-[80px] tab:mt-[120px] desk:mt-[189px]",
    imageGapClass: "mt-[40px] tab:mt-[56px] desk:mt-[144px]",
  },
];

/**
 * Panel + card column, mirroring the homepage's `ServicesSection` mechanism.
 *
 * The two must stay siblings inside this one positioned parent — splitting them across
 * components breaks the sticky containment. `self-start` is equally load-bearing: a
 * stretched flex item is as tall as the section and can never move, which silently
 * disables `position: sticky`.
 *
 * Differences from the homepage panel, all measured:
 *   - radius is `0 0 80px 0` (bottom-right only), not `0 80px 80px 0`
 *   - card titles are EB Garamond 76px/500, not Poppins 43.2px
 *   - card images are 540 x 339 with an 8px radius, not square
 *   - there are no pill tags on this page at all
 *
 * Layout at the measured 1425px width:
 *   panel      = 50% (712.5), content `max-width: 540px` centred -> 86.25px side margins
 *   card column= 50%, same 540px content column at x = 799
 *   section    = 4789 tall, driven entirely by the card column
 */
function ServicesOverview() {
  return (
    <section className="relative flex w-full flex-col font-sans desk:flex-row">
      {/* Sticky only from 1025px up — Elementor's `sticky_on: ["desktop"]`. */}
      <aside
        className={cn(
          "w-full rounded-br-[80px] bg-dsg-orange px-[8.1%] py-[80px]",
          "tab:px-[6.2%] tab:py-[100px]",
          "desk:w-1/2 desk:min-h-screen",
          "desk:px-0 desk:pt-[160px] desk:pb-0",
        )}
      >
        {/*
          Heading 76 + paragraph 72 + the 380px row block + the button, on 40px
          gaps. The rows were missing from this panel until they were measured
          at both widths; the live block is 380px (4 x 77 + 3 x 24).
        */}
        <div className="mx-auto flex w-full max-w-[540px] flex-col gap-[40px] desk:sticky desk:top-[160px]">
          <h1 className="font-serif text-[56px] font-medium leading-[56px] text-white tab:text-[56px] tab:leading-[56px] desk:text-[76px] desk:leading-[76px]">
            Our Serv<i>i</i>ces
          </h1>

          <p className="text-[16px] font-normal leading-[24px] text-white">
            We specialize in shaping impactful brand identities, building
            captivating websites through design and development, and providing
            reliable design support to meet all your requirements.
          </p>

          {/*
            The four numbered rows. Measured on the live panel: each row is 77px
            tall with a 1px white rule, 24px apart, the number 20px/500 at 48%
            white and the label 40px/500. Rows 01-03 are in-page anchors matching
            the card ids; row 04 leaves the site.

            Note the fourth label is "Digital Brand Book" here, not the
            homepage's "Online Brand Guide" for the same destination.
          */}
          <nav className="flex w-full flex-col gap-[24px]">
            {PANEL_ROWS.map((row) => (
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
            href="/contact-us/"
            className="mt-auto inline-block h-[53px] w-[210px] rounded-[200px] border-[2px] border-white bg-transparent px-[56px] py-[16px] text-center text-[16px] font-medium leading-[19.2px] text-white transition-colors duration-300 hover:bg-white hover:text-dsg-orange"
          >
            Get a Quote
          </a>
        </div>
      </aside>

      <div className="w-full px-[24px] py-[80px] tab:px-[6.2%] tab:py-[100px] desk:w-1/2 desk:px-0 desk:py-[160px]">
        {/* 29px sits the first eyebrow at y = 637 against a column padded to 608. */}
        <div className="mx-auto flex w-full max-w-[540px] flex-col pt-[29px]">
          {SERVICE_CARDS.map((card) => (
            <article
              key={card.title.join("")}
              className={cn("flex w-full flex-col", card.gapAboveClass)}
            >
              {/* The eyebrow is indented 27px past the rest of the card (x 826 vs 799). */}
              <h3 className="pl-[27px] text-[20px] font-medium leading-[26px] text-dsg-ink-strong">
                {card.eyebrow}
              </h3>

              <h1 className="mt-[29px] font-serif text-[54px] font-medium leading-[54px] text-dsg-ink-strong tab:text-[76px] tab:leading-[76px] desk:text-[76px] desk:leading-[76px]">
                {card.title[0]}
                <i>{card.title[1]}</i>
                {card.title[2]}
              </h1>

              {/*
                Outlined pills, not prose: measured 14/14 at 400 in #F56341,
                padding 8px 16px, 200px radius, 32px tall. The live /services/
                cards carry no description paragraph at any width — that copy
                belongs to the homepage cards.
              */}
              <ul className="mt-[24px] flex flex-wrap gap-[8px]">
                {card.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[200px] border border-dsg-orange px-[16px] py-[8px] text-[14px] leading-[14px] font-normal text-dsg-orange"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/*
                800 x 501 natural, rendered 540 x 339 at desktop and 342 x 214
                at 390 — natural aspect at every width, no crop. (An earlier
                reading of 342 x 342 here was measuring images that had not
                loaded; the placeholder box is square.)
              */}
              <Image
                src={card.image}
                alt={`${card.title.join("")} service`}
                width={800}
                height={501}
                sizes="(min-width: 1025px) 540px, 100vw"
                className={cn("h-auto w-full rounded-[8px]", card.imageGapClass)}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------ */
/* 3. DIVE process `9f58303`                                                             */
/* ------------------------------------------------------------------------------------ */

interface ProcessStep {
  title: string;
  body: string;
  icon: string;
  /** Which side the 240px icon sits on; the copy takes the other. */
  iconSide: "left" | "right";
}

/**
 * Body copy taken verbatim from `extract-services-page.json` — all four strings are well
 * inside the extractor's truncation limit, so these are the complete values.
 */
const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    title: "DIVE",
    body: "We delve into learning about your brand and business, ensuring a comprehensive understanding of who you are and your goals.",
    icon: `${PAGE_IMAGES}/Designally_Our-service_icon-Dive.png`,
    iconSide: "left",
  },
  {
    title: "DEFINE",
    body: "Our team carefully analyze and digest the information gathered, crafting a detailed plan that aligns with your project goals and objectives.",
    icon: `${PAGE_IMAGES}/Designally_Our-service_icon-Define.png`,
    iconSide: "right",
  },
  {
    title: "DESIGN",
    body: "Work our magic to explore the best creative design solutions for your brand, don’t stop until we find the perfect fit.",
    icon: `${PAGE_IMAGES}/Designally_Our-service_icon-Design.png`,
    iconSide: "left",
  },
  {
    title: "DELIVER",
    body: "Deliver the project with the highest possible quality. Our team will always be happy to support and assist even after project is completed.",
    icon: `${PAGE_IMAGES}/Designally_Our-service_icon-Deliver.png`,
    iconSide: "right",
  },
];

/**
 * Four steps on a 320px pitch: each row is exactly as tall as its 240px icon and the rows
 * are separated by the container's 80px gap (240 x 4 + 80 x 3 + 160 top + 154 bottom =
 * the measured 1514px section).
 *
 * Horizontal rhythm, derived from the measured edges inside the 1200px container:
 *   the icon is inset 225px from its outer edge, the 317px copy block 128px from its own,
 *   and `justify-between` leaves the ~290px gutter the live site shows.
 * Headings align toward the centre of the page — left on icon-left rows, right on
 * icon-right rows — so `DELIVER` (329px set) overhangs its 317px block on the left, as
 * measured. The copy is vertically centred in the row (22px above, 22px below).
 *
 * Below 1025px the alternating sides collapse to one centred column, icon above copy.
 */
function ServicesProcess() {
  return (
    <section className="w-full font-sans">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[64px] px-[24px] pt-[40px] pb-[64px] tab:px-[6.2%] tab:py-[110px] desk:gap-[80px] desk:px-0 desk:pt-[160px] desk:pb-[154px]">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.title}
            className={cn(
              "flex flex-col items-center gap-[32px]",
              "desk:h-[240px] desk:flex-row desk:items-center desk:justify-between desk:gap-0",
              step.iconSide === "left"
                ? "desk:pl-[225px] desk:pr-[128px]"
                : "desk:flex-row-reverse desk:pl-[128px] desk:pr-[225px]",
            )}
          >
            {/* 512 x 512 natural, rendered 240 x 240. Decorative. */}
            <Image
              src={step.icon}
              alt=""
              width={512}
              height={512}
              sizes="(min-width: 1025px) 240px, 160px"
              className={cn(
                // Hidden below the tablet breakpoint: the live section drops
                // the icons entirely at 390 and shows them again at 768.
                "max-tab:hidden",
                "h-[160px] w-[160px] shrink-0 desk:h-[240px] desk:w-[240px]",
              )}
            />

            <div
              className={cn(
                "flex w-full flex-col text-center desk:w-[317px]",
                step.iconSide === "left" ? "desk:text-left" : "desk:text-right",
              )}
            >
              <h1 className="text-[54px] font-semibold leading-[54px] whitespace-nowrap text-dsg-orange tab:text-[76px] tab:leading-[76px] desk:text-[76px] desk:leading-[76px]">
                {step.title}
              </h1>

              <p className="mt-[24px] text-[16px] font-normal leading-[24px] text-dsg-ink-strong">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------ */

export interface ServicesPageContentProps {
  className?: string;
}

/** The full body of /services/, between `SiteHeader` and the shared `CtaSection`. */
export function ServicesPageContent({ className }: ServicesPageContentProps) {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <ServicesHero />
      <ServicesOverview />
      <ServicesProcess />
    </div>
  );
}
