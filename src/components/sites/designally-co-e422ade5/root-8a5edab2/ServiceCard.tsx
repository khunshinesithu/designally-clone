import type { DsgServiceCard } from "@/types/designally";

const IMAGE_BASE = "/sites/designally-co-e422ade5/root-8a5edab2/images";

/**
 * The five service cards of the Services section, in live-site order.
 *
 * Cards 1, 4 and 5 carry the anchor ids the sticky panel's in-page links target
 * (`#Branding`, `#Website`, `#DesignAlly`). Every image is 800 × 501 natural.
 */
export const SERVICE_CARDS: DsgServiceCard[] = [
  {
    anchorId: "Branding",
    eyebrow: "BRANDING",
    title: "Brand Core",
    description:
      "We uncover and define your brand’s essence its nature, purpose, and direction to build clarity, differentiation, and communication that truly resonates with your audience.",
    tags: [
      "Naming",
      "Brand Story",
      "Core Values, Vision, Mission",
      "Tagline",
      "Brand Archetype",
      "Brand Personality",
    ],
    image: {
      src: `${IMAGE_BASE}/brandcore.jpg`,
      alt: "Brand Core",
      width: 800,
      height: 501,
    },
  },
  {
    eyebrow: "BRANDING",
    title: "Brand Visuals",
    description:
      "We design essential visual elements for both online and offline communication, guided by your brand identity to make your presence distinct, cohesive, and memorable.",
    tags: [
      "Logo Design",
      "Typography",
      "Color Scheme",
      "Logo Guideline",
      "Graphic Elements",
    ],
    image: {
      src: `${IMAGE_BASE}/brandvisual.jpg`,
      alt: "Brand Visuals",
      width: 800,
      height: 501,
    },
  },
  {
    eyebrow: "BRANDING",
    title: "Brand Execution",
    description:
      "Every touchpoint is a chance to impress. We equip your brand with clear, consistent, and well-crafted communication delivered with precision.",
    tags: [
      "Collateral",
      "Social Media Template",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: {
      src: `${IMAGE_BASE}/brandexc.jpg`,
      alt: "Brand Execution",
      width: 800,
      height: 501,
    },
  },
  {
    anchorId: "Website",
    eyebrow: "WEBSITE",
    title: "Website + Dev",
    description:
      "We design and develop websites that reflect your brand with clarity—optimized for user experience, search visibility, and digital performance to support your growth.",
    tags: [
      "Informative",
      "Corporate",
      "E-Commerce",
      "Booking Platform",
      "Web Application",
      "Sales Page",
      "Investor Relation",
    ],
    image: {
      src: `${IMAGE_BASE}/website.jpg`,
      alt: "Website + Dev",
      width: 800,
      height: 501,
    },
  },
  {
    anchorId: "DesignAlly",
    eyebrow: "Your Design Ally",
    title: "Design Support",
    description:
      "Our design support covers all your creative needs—per project or monthly—with a professional team, clear workflow and designs that meet your goals.",
    tags: [
      "Design Outsourcing",
      "Graphic Design",
      "Package Design",
      "Motion Graphic",
      "Print Design & Production",
    ],
    image: {
      src: `${IMAGE_BASE}/designsupport.jpg`,
      alt: "Design Support",
      width: 800,
      height: 501,
    },
  },
];
