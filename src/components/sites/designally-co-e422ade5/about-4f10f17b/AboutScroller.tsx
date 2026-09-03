"use client";

/**
 * designally.co — /about/ horizontal scroller (Elementor `main.elementor-element-21e1c2b`).
 *
 * The whole page is one row of ten panels inside a horizontally scrolling `<main>`.
 * The live site turns vertical wheel input into horizontal scroll with this inline
 * script, which `useHorizontalWheel` below reproduces exactly:
 *
 *     if (window.innerWidth > 1025) {
 *        const scrollContainer = document.querySelector("main");
 *        scrollContainer.addEventListener("wheel", (evt) => {
 *            evt.preventDefault();
 *            scrollContainer.scrollLeft += evt.deltaY;
 *        });
 *     }
 *
 * Measured on the live site (viewport 1467 x 1334, `<main>` client box 1452 x 1200):
 * - `<main>`  `overflow: auto` both axes, top edge at y=132 (below the in-flow header).
 * - track     `display: flex; flex-direction: row; padding: 30px 0 0`, scrollWidth 12297.
 * - panels    seven are **100vw** — not a fixed 1440 — plus three fixed ones
 *             (691, 689, 647). 7 x 1467 + 2027 = 12296; at a 1440 viewport the same
 *             sum is 12107, which is the 12108 recorded in the extraction.
 * - every panel carries `min-height: 100vh`; panel 9 additionally has
 *   `margin-top: 134px`, so it measures 100vh - 134.
 *
 * Below 1025px the listener is not attached, the panels stack and the page scrolls
 * normally; the desktop pixel measurements are all behind the `desk:` variant.
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { DoubleChevronIcon } from "@/components/sites/designally-co-e422ade5/shared/icons";
import { cn } from "@/lib/utils";

const IMAGES = "/sites/designally-co-e422ade5/about-4f10f17b/images";
const SVGS = "/sites/designally-co-e422ade5/about-4f10f17b/svg";

/** Viewport width above which the wheel-to-scrollLeft mapping is live. */
const DESKTOP_MIN_WIDTH = 1025;

/**
 * One run of a heading. designally.co sets a single letter of most headings in the
 * serif italic — "OUR SERV*i*CES" on /services/, "Simplic*i*ty." here — so every
 * heading that does it is stored as runs rather than a plain string.
 */
interface TextRun {
  readonly text: string;
  readonly italic?: boolean;
}

function Runs({ runs }: { runs: readonly TextRun[] }) {
  return (
    <>
      {runs.map((run, index) =>
        run.italic ? <i key={index}>{run.text}</i> : <span key={index}>{run.text}</span>,
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel 3 — client logo wall                                                  */
/* -------------------------------------------------------------------------- */

interface ClientLogo {
  readonly file: string;
  readonly name: string;
}

/**
 * The 48 logos in DOM order. The files are numbered 01-48 in *row* order but the
 * live markup emits them column-first (01, 07, 13, 19, 25, 31, 37, 43, 02, 08, ...),
 * which — laid into an 8-column grid — puts 01..06 back on the first visual row.
 * Names are paired by index with `panel3.names` in extract-about-rest.json.
 */
const CLIENT_LOGOS: readonly ClientLogo[] = [
  { file: "01-CP-Land_Color.jpg", name: "CP Land" },
  { file: "07-Marriot-Resort-Spa_Color.jpg", name: "Marriott" },
  { file: "13-Bangkok-Uni_Color.jpg", name: "Bangkok University" },
  { file: "19-Bitazza_Color.jpg", name: "Bitazza" },
  { file: "25-Airport-of-Thailand_Color.jpg", name: "Airports of Thailand" },
  { file: "31-Major-Cineplex-_Color.jpg", name: "Major Cineplex" },
  { file: "37-DD-Property_Color.jpg", name: "DDProperty" },
  { file: "43-Aroma-Group_Color.jpg", name: "Aroma Group" },
  { file: "02-Property-Perfect_Color.jpg", name: "Property Perfect" },
  { file: "08-So-Bangkok_Color.jpg", name: "SO/ Bangkok" },
  { file: "14-Chula-Uni_Color.jpg", name: "Chulalongkorn University" },
  { file: "20-StashAway_Color.jpg", name: "StashAway" },
  { file: "26-PEA_Color.jpg", name: "Provincial Electricity Authority" },
  { file: "32-SCG_Color.jpg", name: "Siam Cement Group" },
  { file: "38-Lazada_Color.jpg", name: "Lazada" },
  { file: "44-Chao-Doi_Color.jpg", name: "Chao Doi" },
  { file: "03-SC-Assets_Color.jpg", name: "SC ASSET" },
  { file: "09-Avani-Bangkok_Color.jpg", name: "Avani+ Bangkok" },
  { file: "15-Kasetsart-Uni_Color.jpg", name: "Kasetsart University" },
  { file: "21-Superrich_Color.jpg", name: "SuperRich" },
  { file: "27-MCOT_Color.jpg", name: "MCOT" },
  { file: "33-Muang-Thai-Insurance_Color.jpg", name: "Muang Thai Life Assurance" },
  { file: "39-Line_Color.jpg", name: "LINE" },
  { file: "45-Fat-Coco_Color.jpg", name: "Fat Coco" },
  { file: "04-K-Village_Color.jpg", name: "K Village" },
  { file: "10-Boonthavorn_Color.jpg", name: "Boonthavorn" },
  { file: "16-Thammasart-Uni_Color.jpg", name: "Thammasat University" },
  { file: "22-Transmission_Color.jpg", name: "Transmission Festival" },
  { file: "28-INNNews_Color.jpg", name: "INN News" },
  { file: "34-Betagro_Color.jpg", name: "Betagro" },
  { file: "40-Pomelo_Color.jpg", name: "Pomelo" },
  { file: "46-Shinsen-Fish-Market_Color.jpg", name: "Shinsen Fish Market" },
  { file: "05-Seacon-Bangkae_Color.jpg", name: "Seacon Bangkae" },
  { file: "11-Villeroy-Boch_Color.jpg", name: "Villeroy & Boch" },
  { file: "17-Sripratum-Uni_Color.jpg", name: "Sripatum University" },
  { file: "23-Unk-Festival_Color.jpg", name: "Unkonscious Festival" },
  { file: "29-Mjets_Color.jpg", name: "MJets" },
  { file: "35-Banpu-Next_Color.jpg", name: "Banpu NEXT" },
  { file: "41-Zalora_Color.jpg", name: "ZALORA" },
  { file: "47-Tim-Ho-Wan_Color.jpg", name: "Tim Ho Wan Thailand" },
  { file: "06-Siam-Park-City_Color.jpg", name: "Siam Amazing Park" },
  { file: "12-Koze_Color.jpg", name: "KOZE Furniture" },
  { file: "18-Raffles-Design-Institute_Color.jpg", name: "Raffles Design Institute" },
  { file: "24-Mystic-Valley_Color.jpg", name: "Mystic Valley Festival" },
  { file: "30-TST-Party_Color.jpg", name: "Thai Sang Thai Party" },
  { file: "36-Huawei_Color.jpg", name: "Huawei" },
  { file: "42-Mespace_Color.jpg", name: "Mespace" },
  { file: "48-Haoma_Color.jpg", name: "Haoma Bangkok" },
];

/* -------------------------------------------------------------------------- */
/* Panels 5-8 — industry lists                                                 */
/* -------------------------------------------------------------------------- */

interface IndustryColumn {
  /** Which panel the column belongs to, 5-8. */
  readonly panel: number;
  /** Category heading, split so its one italic letter can be reproduced. */
  readonly label: readonly TextRun[];
  /**
   * The orange count as the live page prints it. Two of these disagree with the
   * list beside them and are reproduced verbatim: Consumer Products says 25 for
   * 26 names, Real Estate says 13 for 7.
   */
  readonly count: string;
  readonly names: readonly string[];
  /**
   * Consumer Products overflows into a second, unlabelled sub-column after its
   * 13th name; that continuation column carries no heading of its own.
   */
  readonly continuation?: readonly string[];
}

const INDUSTRY_COLUMNS: readonly IndustryColumn[] = [
  {
    panel: 5,
    label: [{ text: "Agenc" }, { text: "i", italic: true }, { text: "es" }],
    count: "5",
    names: [
      "Convergency",
      "Merge Collective",
      "On-Point Media",
      "Qccommunications",
      "Rise Creative",
    ],
  },
  {
    panel: 5,
    label: [{ text: "Bars & Restaur" }, { text: "a", italic: true }, { text: "nts" }],
    count: "12",
    names: [
      "Attitude Rooftop",
      "Black The Jazz Spot",
      "Fat Coco",
      "Haoma",
      "Khao",
      "Kin + Duem",
      "Malibrew",
      "NoWhere",
      "Pippa",
      "Shinsen Fish Market",
      "The 51 Tasty Moments",
      "Tim Ho Wan",
    ],
  },
  {
    panel: 5,
    label: [{ text: "Corpor" }, { text: "a", italic: true }, { text: "te" }],
    count: "12",
    names: [
      "AIA",
      "AsiaInfo Linkage",
      "Benchachinda Group",
      "Brainergy",
      "Huawei",
      "INNNews",
      "Major Cineplex",
      "Mjets",
      "Muang Thai Insurance",
      "SCG",
      "SCG Trading",
      "SCSI",
    ],
  },
  {
    panel: 5,
    label: [{ text: "Consumer Prod" }, { text: "u", italic: true }, { text: "cts" }],
    count: "25",
    names: [
      "Aunchalee Boutique",
      "BanaPlaya",
      "Boonthavorn",
      "CannaKacha",
      "Dr.Bewell",
      "Ducati",
      "Koze Furniture",
      "Laga",
      "Lee",
      "Miyoshi",
      "Mohmee",
      "Monier Group",
      "Nanobag",
    ],
    continuation: [
      "Nich Cosmetic",
      "Nikko",
      "Nourigo",
      "Spark Kids",
      "PIP Intetnational",
      "Pet Party",
      "Pomelo Fashion",
      "Ramita Trading",
      "Thai Gem Center",
      "Thai Kitchen Mart",
      "Villeroy & Boch",
      "Woonae Cosmetics",
      "Zalora",
    ],
  },
  {
    panel: 6,
    label: [{ text: "Educat" }, { text: "i", italic: true }, { text: "on" }],
    count: "8",
    names: [
      "Bangkok University",
      "Chulalongkorn University",
      "English MunMun",
      "Kasetsart University",
      "Pearson",
      "Raffles Design Institute",
      "Sripratum University",
      "Thammasart University",
    ],
  },
  {
    panel: 6,
    label: [
      { text: "Eve" },
      { text: "n", italic: true },
      { text: "ts & Festiv" },
      { text: "a", italic: true },
      { text: "ls" },
    ],
    count: "8",
    names: [
      "Dontri Music Festival",
      "Epic Entertainment",
      "Live Events Group",
      "Miss Thailand",
      "Miss Universe Thailand",
      "Mystic Valley",
      "Transmission Festival",
      "Unkonscious Festival",
    ],
  },
  {
    panel: 6,
    label: [{ text: "Ene" }, { text: "r", italic: true }, { text: "gy" }],
    count: "4",
    names: ["Banpu Next", "PTT MCC Biochem", "Scan Inter", "Technip"],
  },
  {
    panel: 6,
    label: [{ text: "Food & Bever" }, { text: "a", italic: true }, { text: "ges" }],
    count: "10",
    names: [
      "Aroma Group",
      "Bangkok Sausage House",
      "Chao Doi Coffee",
      "Mingo",
      "Puchi",
      "Redbull",
      "Russian Standard Vodka",
      "Siam Winery Commercial",
      "So Fresh",
      "Tattva",
    ],
  },
  {
    panel: 6,
    label: [{ text: "Financial Serv" }, { text: "i", italic: true }, { text: "ces" }],
    count: "4",
    names: ["Bitazza", "Kryptodian", "StashAway", "Superrich"],
  },
  {
    panel: 7,
    label: [{ text: "Governm" }, { text: "e", italic: true }, { text: "nt" }],
    count: "8",
    names: [
      "Airport of Thailand",
      "EGAT",
      "GIZ Thailand",
      "MCOT",
      "PEA",
      "Thailand Immigration Bureau",
      "Thailand Ministry of Energy",
      "Thailand Ministry of Finance",
    ],
  },
  {
    panel: 7,
    label: [{ text: "Hospital" }, { text: "i", italic: true }, { text: "ty" }],
    count: "7",
    names: [
      "A-One Hotel",
      "Avani Hotel",
      "Marriot Resort & Spa",
      "Mytt Beach hotel",
      "Richmond Hotel",
      "So/ Bangkok",
      "The White Garden",
    ],
  },
  {
    panel: 7,
    label: [
      { text: "Industrial & Manufactu" },
      { text: "r", italic: true },
      { text: "ing" },
    ],
    count: "13",
    names: [
      "BIS Group",
      "Betagro",
      "Green Leaf Chemical",
      "Hi-Tech Apparel",
      "Lucky Star",
      "Nihon Superior",
      "PP Prime",
      "SPS Intertech",
      "Skytower",
      "Skytower Infra",
      "Success Group",
      "Voestalpine",
      "Wann Cosmetics & Laboratory",
    ],
  },
  {
    panel: 7,
    label: [{ text: "Online Serv" }, { text: "i", italic: true }, { text: "ces" }],
    count: "7",
    names: [
      "DDproperty",
      "ICAR Asia",
      "Insightera",
      "Lazada",
      "Line",
      "Mespace",
      "Rakmao",
    ],
  },
  {
    panel: 7,
    label: [{ text: "Real Est" }, { text: "a", italic: true }, { text: "te" }],
    count: "13",
    names: [
      "Aesthete Estate",
      "CP Land",
      "Motif Development",
      "Property Perfect",
      "Ratcha",
      "SC Assets",
      "Utopia Corporation",
    ],
  },
  {
    panel: 8,
    label: [{ text: "Othe" }, { text: "r", italic: true }, { text: "s" }],
    count: "13",
    names: [
      "Atlas Capital",
      "Fitness 7 Thailand",
      "Foodie Market",
      "Global Assets",
      "Hallmark",
      "Honda Leasing Thailand",
      "K Village",
      "Nakornloung Promotion",
      "Rajpruek Club",
      "Seacon Bangkae",
      "Siam Park City",
      "ThaiSangThai Party",
      "Young President Organization",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Panel 2 — Elementor animated headline                                       */
/* -------------------------------------------------------------------------- */

/** The four rotating words of "Make *i*t ___". */
const CYCLING_WORDS = ["Simple.", "Right.", "Works.", "Lasts."] as const;

/**
 * The live rotation interval was never measured; 2500ms is Elementor's own default
 * for the animated-headline widget and is what this clone uses.
 */
const CYCLE_INTERVAL_MS = 2500;

/* -------------------------------------------------------------------------- */
/* Shared class fragments                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The seven full-bleed panels. `w-screen` is the measured `100vw` — it is what makes
 * the track 12108px wide at a 1440px viewport. Vertically each panel is `min-h-screen`.
 */
const WIDE_PANEL =
  "flex w-full shrink-0 flex-col px-6 py-16 desk:min-h-screen desk:w-screen desk:px-0 desk:py-0";

/** Elementor `.e-con-inner` on this page: a fixed 1200px column, centred. */
const INNER_1200 = "mx-auto flex w-full max-w-[1200px] flex-col";

/** Category heading: EB Garamond 20px/600 in brand orange (measured, not Poppins). */
const CATEGORY_LABEL =
  "font-serif text-[20px] leading-[26px] font-semibold text-dsg-orange";

/**
 * The hero's two hand-drawn marks ship with `fill="black"` baked into the asset, but
 * the live page overrides that from CSS — both compute to `rgb(245, 99, 65)`. An
 * `<img>` cannot be recoloured by the host document, so (exactly as SiteHeader does
 * with the wordmark) the mark is painted as a brand-orange block masked by the very
 * same SVG file: same asset, same measured colour, no inlined path data.
 */
function maskedMark(src: string): React.CSSProperties {
  const url = 'url("' + src + '")';
  return {
    maskImage: url,
    WebkitMaskImage: url,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
  };
}

export function AboutScroller() {
  const scrollerRef = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  /** The word that just left, so it can drop out while the next drops in. */
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);

  /**
   * The page's defining behaviour. `{ passive: false }` is required because the
   * handler calls `preventDefault`; the listener only exists above 1025px and is
   * re-evaluated whenever the viewport crosses that line.
   */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let attached = false;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      scroller.scrollLeft += event.deltaY;
    };

    const sync = () => {
      const shouldAttach = window.innerWidth > DESKTOP_MIN_WIDTH;
      if (shouldAttach === attached) return;
      if (shouldAttach) {
        scroller.addEventListener("wheel", onWheel, { passive: false });
      } else {
        scroller.removeEventListener("wheel", onWheel);
      }
      attached = shouldAttach;
    };

    sync();
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("resize", sync);
      if (attached) scroller.removeEventListener("wheel", onWheel);
    };
  }, []);

  /** Panel 2's rotating word. */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((current) => {
        setLeavingIndex(current);
        return (current + 1) % CYCLING_WORDS.length;
      });
    }, CYCLE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  /**
   * Keyboard access. The live script gives keyboard users no way to move the track,
   * so this clone adds one: the container is focusable and answers the arrow keys,
   * Page Up/Down and Home/End. Keystrokes are only intercepted when the container
   * itself has focus, so links inside the panels keep their native behaviour — and
   * tabbing to them still scrolls them into view.
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || event.target !== event.currentTarget) return;
    if (window.innerWidth <= DESKTOP_MIN_WIDTH) return;

    const page = scroller.clientWidth * 0.9;
    let left: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        left = scroller.scrollLeft + 120;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        left = scroller.scrollLeft - 120;
        break;
      case "PageDown":
        left = scroller.scrollLeft + page;
        break;
      case "PageUp":
        left = scroller.scrollLeft - page;
        break;
      case "Home":
        left = 0;
        break;
      case "End":
        left = scroller.scrollWidth;
        break;
      default:
        return;
    }

    event.preventDefault();
    scroller.scrollTo({ left, behavior: "smooth" });
  }, []);

  return (
    <main
      ref={scrollerRef}
      tabIndex={0}
      aria-label="About DESIGNALLY — scroll sideways to read"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full min-h-0 flex-1 flex-col",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-dsg-orange",
        "desk:flex-row desk:overflow-auto",
      )}
    >
      {/* Track `21e1c2b` — flex row, `padding: 30px 0 0`, scrollWidth 12108 at 1440.
          Its panels are a full `100vh` while `<main>` is only `100vh - 132`, and the
          live track carries a -164px top margin that pulls the overflow off the top
          so the panels end flush with the bottom of the scroller (measured: track at
          y=-32 against a `<main>` at y=132, panel tops at y=-2, panel bottoms exactly
          on the scroller's bottom edge). */}
      <div className="flex w-full flex-col desk:-mt-[164px] desk:w-max desk:flex-row desk:pt-[30px]">
        {/* ---------------------------------------------------------------- */}
        {/* Panel 0 `f56a6fa` — hero                                          */}
        {/* ---------------------------------------------------------------- */}
        <section
          className={cn(
            WIDE_PANEL,
            "items-center justify-between desk:px-[80px] desk:pb-[80px]",
          )}
        >
          <div className="flex w-full max-w-[1307px] flex-1 flex-col desk:mt-[32px]">
            <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 desk:mx-auto desk:max-w-[1140px]">
              {/* "Secret Recipe" label + its hand-drawn arrow, right-aligned above the
                  headline. Measured in the 1140px row: the arrow is laid out 52 x 80
                  (height 80, aspect preserved from the 80 x 124 viewBox) and carries a
                  net -79deg rotation from two stacked Elementor transforms; the label
                  is Caveat 26px/700 in brand orange at a net -15deg. */}
              <div className="flex w-full items-start justify-end gap-[27px] desk:mt-[80px] desk:pr-[39px]">
                <span
                  aria-hidden="true"
                  style={maskedMark(SVGS + "/secret-recipe-arrow.svg")}
                  className="block h-[80px] w-[52px] shrink-0 rotate-[-79deg] bg-dsg-orange desk:mt-[27px]"
                />
                <p className="w-[72px] rotate-[-15deg] text-center font-[family-name:var(--font-hand)] text-[26px] leading-[32px] font-bold text-dsg-orange">
                  Secret
                  <br />
                  Recipe
                </p>
              </div>

              <h1 className="w-full text-center font-serif text-[64px] leading-[64px] font-medium text-dsg-ink desk:text-[200px] desk:leading-[200px]">
                <Runs
                  runs={[
                    { text: "Simplic" },
                    { text: "i", italic: true },
                    { text: "ty." },
                  ]}
                />
              </h1>

              <p className="w-full max-w-[605px] text-center text-[16px] leading-6 text-dsg-ink-strong desk:mt-[80px]">
                We believe that simplicity enhances efficiency, fosters clear
                communication, and drives successful outcomes. Embrace simplicity in the
                way we work to streamline processes and achieve remarkable results.
              </p>
            </div>
          </div>

          {/* Bottom-right "Scroll to / Navigate" badge — a 115 x 110 hand-drawn blob
              with the two Caveat 32px/700 lines sitting on top of it at the measured
              offsets (12,-8) and (41,17) from the blob's top-left corner.

              Desktop only: the track is only a horizontal scroller from 1025px
              up — below that the panels stack and the page scrolls down like
              any other — so the hint describes something that is not happening.
              It also overhung the viewport by 3px at 390, since the text is
              rotated and positioned outside its 115px blob. */}
          <div className="mt-12 hidden w-full max-w-[1307px] items-center justify-end desk:mt-0 desk:flex">
            <div className="relative h-[110px] w-[115px]">
              <span
                aria-hidden="true"
                style={maskedMark(SVGS + "/scroll-to-navigate-badge.svg")}
                className="absolute inset-0 block h-[110px] w-[115px] bg-dsg-orange"
              />
              <div className="absolute top-[-8px] left-[12px] rotate-[-10deg] font-[family-name:var(--font-hand)] text-[32px] leading-[32px] font-bold whitespace-nowrap text-dsg-ink-strong">
                <p>Scroll to</p>
                <p className="mt-[-7px] ml-[29px]">Navigate</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Panel 1 `288e7f6` — where the name comes from                      */}
        {/* ---------------------------------------------------------------- */}
        <section className={WIDE_PANEL}>
          <div className={cn(INNER_1200, "justify-center gap-5 desk:min-h-screen")}>
            <div className="flex flex-col gap-10 desk:flex-row desk:gap-0">
              {/* Left column, 552px with 180px of right padding: the two words drawn
                  as artwork (each SVG is the word itself, not a highlight stroke),
                  then the handwritten aside. */}
              <div className="flex flex-col justify-center gap-5 desk:w-[552px] desk:shrink-0 desk:pr-[180px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SVGS + "/design-highlight.svg"}
                  alt=""
                  width={363}
                  height={80}
                  className="h-auto w-full max-w-[363px] desk:ml-[4px]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SVGS + "/ally-highlight.svg"}
                  alt=""
                  width={312}
                  height={80}
                  className="h-auto w-full max-w-[312px] desk:ml-[29px]"
                />
                <p className="rotate-[-24deg] text-center font-[family-name:var(--font-hand)] text-[41px] leading-[45px] font-bold text-dsg-ink-strong desk:ml-[240px] desk:w-[160px]">
                  Your trusted
                  <br />
                  partners!
                </p>
              </div>

              {/* Right column, 648px: a wrapping flex row of 40px/52px headings, the
                  two quoted words in brand orange, then the body copy. */}
              <div className="flex flex-wrap items-start desk:w-[648px] desk:shrink-0">
                <DoubleChevronIcon className="mr-[24px] h-[40px] w-[18px] shrink-0" />
                <h2 className="text-[28px] leading-[38px] font-medium text-dsg-ink-strong desk:text-[40px] desk:leading-[52px]">
                  Our name is a combination
                </h2>
                <div className="flex w-full flex-wrap items-baseline gap-x-[14px] text-[28px] leading-[38px] font-medium text-dsg-ink-strong desk:text-[40px] desk:leading-[52px]">
                  <h2 className="font-medium">of the words</h2>
                  <h2 className="font-medium text-dsg-orange">&ldquo;design&rdquo;</h2>
                  <h2 className="font-medium">and</h2>
                  <h2 className="font-medium text-dsg-orange">&ldquo;ally.&rdquo;</h2>
                </div>
                <p className="mt-[40px] w-full text-[16px] leading-6 text-dsg-ink-strong desk:max-w-[588px]">
                  It embodies our philosophy of being a creative design ally for our
                  clients. Our aim is to be the trusted partner that businesses can rely
                  on for all their design needs. Supporting our clients, understanding
                  their vision, and working collaboratively to achieve their goals. The
                  name &ldquo;Designally&rdquo; represents our dedication to creative
                  excellence, partnership, and the belief that design has the potential
                  to transform businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Panel 2 `6ecd68d` — "Make it ___"                                 */}
        {/* ---------------------------------------------------------------- */}
        <section className={WIDE_PANEL}>
          <div className={cn(INNER_1200, "justify-center desk:min-h-screen")}>
            <h2 className="font-serif text-[56px] leading-[68px] font-medium text-dsg-ink-strong desk:text-[180px] desk:leading-[216px]">
              <span>
                Make <i>i</i>t{" "}
              </span>
              {/* The four words share one slot. An inline grid stacks them in a single
                  cell, so the slot is exactly as wide as the widest word at any type
                  size and no magic width is needed.

                  Each word drops in from above and settles with a bounce while the
                  one it replaces drops out below, so the pair moves top to bottom
                  together. `overflow-hidden` keeps them clipped to the line while
                  they travel; the 216px line box leaves room for the descender in
                  "Simple." */}
              <span className="relative inline-grid overflow-hidden align-top">
                {CYCLING_WORDS.map((word, index) => (
                  <span
                    key={word}
                    aria-hidden={index !== wordIndex}
                    className={cn(
                      "col-start-1 row-start-1 whitespace-nowrap text-dsg-orange",
                      index === wordIndex && "dsg-word-in",
                      index === leavingIndex && index !== wordIndex && "dsg-word-out",
                      index !== wordIndex && index !== leavingIndex && "opacity-0",
                    )}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h2>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Panel 3 `6d2eec7` — client logo wall                              */}
        {/* ---------------------------------------------------------------- */}
        <section className={WIDE_PANEL}>
          <div className={cn(INNER_1200, "justify-center desk:min-h-screen")}>
            {/* 6 rows x 8 columns on the desktop track, 40px row gap, the row itself
                `justify-content: space-between` across the 1200px container. Each
                logo renders 98 x 69 from a 174 x 123 source. */}
            <ul className="grid grid-cols-3 gap-x-6 gap-y-10 tab:grid-cols-6 desk:grid-cols-8 desk:gap-x-[59px] desk:gap-y-[40px]">
              {CLIENT_LOGOS.map((logo) => (
                <li key={logo.file} className="group relative flex justify-center">
                  <Image
                    src={IMAGES + "/" + logo.file}
                    alt={logo.name}
                    width={98}
                    height={69}
                    className="h-auto w-[98px] max-w-full"
                  />
                  {/* Elementor hotspot tooltip: `background: rgb(33, 33, 33)`,
                      `border-radius: 4px`, `padding: 4px 16px`, white 16px Poppins,
                      hidden until the logo is hovered or focused.

                      Desktop only. Below 1025px the panels stack and a tooltip
                      centred on a logo near the right edge reached 423px in a
                      390px viewport, giving the page 33px of horizontal scroll
                      — for a label that is `opacity-0`, `pointer-events-none`
                      and `aria-hidden`, so nothing is lost by not rendering it
                      where there is no pointer to hover with. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-[4px] bg-dsg-ink-strong px-4 py-1 text-[16px] leading-6 whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 desk:block"
                  >
                    {logo.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Panel 4 `a69e241` — 691px bridge                                  */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex w-full shrink-0 flex-col items-center justify-center px-6 py-16 desk:min-h-screen desk:w-[691px] desk:px-0 desk:py-0 desk:pr-[2px]">
          {/* Measured 104 x 689: a deliberately narrow column that breaks the
              sentence to roughly one word per line. */}
          <h2 className="text-center text-[28px] leading-[38px] font-semibold text-dsg-ink-strong desk:w-[104px] desk:text-[40px] desk:leading-[52px]">
            Trusted by <span className="text-dsg-orange">various businesses</span>
            <br />
            across diverse industries.
          </h2>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Panels 5-8 `eb910cc` `09a4fa2` `43cd37e` `6462a1e` — industries    */}
        {/* ---------------------------------------------------------------- */}
        {/*
          One continuous row rather than four panels.

          The live build splits these across `w-screen` panels holding 4, 5, 5
          and 1 columns. On a 1425px viewport a 4-column panel fills 1148 of it,
          so the panel boundary opens a ~277px hole in the middle of a list that
          should read straight through. Laid out as a single row every column
          keeps the measured 292px pitch — 272px wide on a 20px gap — from the
          first category to the last.

          The row sizes to its content (`w-auto`), so the scroller treats it as
          one wide panel instead of four screen-wide ones.
        */}
        <section className="flex w-full shrink-0 flex-col px-6 py-16 desk:min-h-screen desk:w-auto desk:px-0 desk:py-0">
          <div className="flex flex-col justify-center desk:min-h-screen">
            <div className="flex flex-col gap-10 desk:flex-row desk:items-start desk:gap-[20px] desk:pr-[80px]">
              {INDUSTRY_COLUMNS.map((column) => (
                <IndustryList
                  key={column.label.map((run) => run.text).join("")}
                  column={column}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Panel 9 `c96252e` — orange closing panel                          */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex w-full shrink-0 flex-col items-start justify-center gap-5 rounded-tl-[80px] bg-dsg-orange px-8 py-16 desk:min-h-[calc(100vh-134px)] desk:w-[647px] desk:mt-[134px] desk:px-0 desk:py-0 desk:pl-[160px]">
          <h2 className="text-[20px] leading-[26px] font-medium text-white">
            Tell us about your project
          </h2>
          <p className="max-w-[357px] font-serif text-[48px] leading-[56px] font-medium text-white desk:text-[85px] desk:leading-[85px]">
            <Runs
              runs={[
                { text: "Let’s work toge" },
                { text: "t", italic: true },
                { text: "her." },
              ]}
            />
          </p>
          {/* The live page also carries a `tel:0650055993` "Call Us" heading, but its
              wrapper is `display: none` at every desktop width, so it is not rendered
              here. Only the Contact Us link is visible. */}
          <a
            href="/contact-us/"
            className="mt-[24px] mb-[16px] text-[32px] leading-[42px] font-medium text-white underline-offset-4 hover:underline desk:text-[43px] desk:leading-[55.9px]"
          >
            Contact Us
          </a>
          <Image
            src={IMAGES + "/chicken.png"}
            alt=""
            width={80}
            height={92}
            className="mt-[80px] h-[92px] w-[80px] object-contain"
          />
        </div>
      </div>
    </main>
  );
}

/**
 * One industry column: the EB Garamond category heading with its italic letter, the
 * orange count beside it, then the client names on a 28px pitch. Consumer Products
 * renders a second, headingless column beside it — the live page wraps it after the
 * 13th name.
 */
function IndustryList({ column }: { column: IndustryColumn }) {
  return (
    <>
      <div className="flex shrink-0 flex-col desk:w-[272px]">
        <div className="flex items-baseline gap-[8px]">
          <h2 className={CATEGORY_LABEL}>
            <Runs runs={column.label} />
          </h2>
          <span className="text-[14px] leading-[21px] text-dsg-orange">
            {column.count}
          </span>
        </div>
        <ul className="mt-[20px]">
          {column.names.map((name) => (
            <li key={name} className="text-[16px] leading-[28px] text-dsg-ink">
              {name}
            </li>
          ))}
        </ul>
      </div>

      {column.continuation ? (
        <div className="flex shrink-0 flex-col desk:w-[272px] desk:self-start desk:pt-[46px]">
          <ul>
            {column.continuation.map((name) => (
              <li key={name} className="text-[16px] leading-[28px] text-dsg-ink">
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
