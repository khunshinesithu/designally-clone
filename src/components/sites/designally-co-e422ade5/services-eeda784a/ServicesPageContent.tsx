import Image from "next/image";

import { cn } from "@/lib/utils";

import { ServiceCard } from "../shared/ServiceCard";
import { ServicesPanel } from "../shared/ServicesPanel";

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
  /** The paragraph under the heading — a <div> on the live page, which is why an
   *  earlier `p` query reported these cards as having no deck at all. */
  description: string;
  tags: readonly string[];
  image: { src: string; alt: string; width: number; height: number };
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
    description:
      "Delving deep into your brand strategy, we establish a strong foundation that defines your unique identity, setting the stage for a powerful and purposeful brand presence.",
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
    image: {
      src: `${CARD_IMAGES}/brandcore.jpg`,
      alt: "Brand Core service",
      width: 960,
      height: 602,
    },
    gapAboveClass: "",
    imageGapClass: "mt-[40px] tab:mt-[72px] desk:mt-[264px]",
  },
  {
    eyebrow: "BRANDING",
    title: ["Brand Vis", "u", "als"],
    description:
      "Empower your brand with a design system and curated brand assets, ensuring consistency and flexibility.",
    tags: [
      "Logo Design",
      "Logo Guideline",
      "Color Scheme",
      "Typography",
      "Graphic Elements",
    ],
    image: {
      src: `${CARD_IMAGES}/brandvisual.jpg`,
      alt: "Brand Visuals service",
      width: 960,
      height: 602,
    },
    gapAboveClass: "mt-[80px] tab:mt-[120px] desk:mt-[165px]",
    imageGapClass: "mt-[40px] tab:mt-[56px] desk:mt-[144px]",
  },
  {
    eyebrow: "BRANDING",
    title: ["Brand Execut", "i", "on"],
    description:
      "Bring your brand identity to life by translating it into tangible assets that communicate effectively with your audience.",
    tags: [
      "Collateral",
      "Social Media Template",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: {
      src: `${CARD_IMAGES}/brandexc.jpg`,
      alt: "Brand Execution service",
      width: 960,
      height: 602,
    },
    gapAboveClass: "mt-[80px] tab:mt-[120px] desk:mt-[164px]",
    imageGapClass: "mt-[40px] tab:mt-[56px] desk:mt-[144px]",
  },
  {
    eyebrow: "WEBSITE",
    title: ["Webs", "i", "te + Dev"],
    description:
      "Our Website Design and Development service ensure your website represents your brand authentically and effectively. Our expert development team brings your vision to life, crafting a dynamic online platform that drives user engagement and achieves your business objectives.",
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
    image: {
      src: `${CARD_IMAGES}/website.jpg`,
      alt: "Website + Dev service",
      width: 960,
      height: 602,
    },
    gapAboveClass: "mt-[80px] tab:mt-[120px] desk:mt-[189px]",
    imageGapClass: "mt-[40px] tab:mt-[56px] desk:mt-[184px]",
  },
  {
    // The eyebrow reads DESIGN SUPPORT but the title is "Design Ally" — measured as such,
    // and different from the homepage card, which is titled "Design Support".
    eyebrow: "DESIGN SUPPORT",
    title: ["Des", "i", "gn Ally"],
    description:
      "Our Design Support service is your trusted design ally, offering monthly support for all your creative needs. Say goodbye to complexities and hello to hassle-free design solutions, allowing you to focus on what you do best while we take care of the rest.",
    tags: [
      "Design Outsourcing Service",
      "Graphic Design",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: {
      src: `${CARD_IMAGES}/designsupport.jpg`,
      alt: "Design Ally service",
      width: 960,
      height: 602,
    },
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
      <ServicesPanel
        heading={["Our Serv", "i", "ces"]}
        intro="We specialize in shaping impactful brand identities, building captivating websites through design and development, and providing reliable design support to meet all your requirements."
        rows={PANEL_ROWS}
        cta={{ label: "Get a Quote", href: "/contact-us/" }}
        topClassName="desk:pt-[160px]"
      />

      <div className="w-full px-[24px] py-[80px] tab:px-[6.2%] tab:py-[100px] desk:w-1/2 desk:px-0 desk:py-[160px]">
        {/* 29px sits the first eyebrow at y = 637 against a column padded to 608. */}
        <div className="mx-auto flex w-full max-w-[540px] flex-col pt-[29px]">
          {SERVICE_CARDS.map((card) => (
            <ServiceCard key={card.title.join("")} card={card} />
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
