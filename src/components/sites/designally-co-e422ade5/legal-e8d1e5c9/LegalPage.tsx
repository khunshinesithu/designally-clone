/**
 * designally.co legal pages — /privacy-policy/ and /cookie-policy/.
 *
 * Plain documents: one Elementor section of headings, paragraphs and nested
 * bullet lists, no images and nothing interactive. Both render this component.
 *
 * Measured on the live /privacy-policy/ at 1440x900:
 *
 *   section  y=131  h=2320   inner width 1140 (not the 1200 the other pages
 *                            use), padding 60px 0, content at x=143
 *   h1       IBM Plex Sans Thai 40/48 500, margin 8px top / 16px bottom
 *   h2       IBM Plex Sans Thai 32/38 500, margin 8px top / 16px bottom
 *   p        IBM Plex Sans Thai 16/24 400, margin-bottom 14.4px
 *   ul       disc, padding-left 40px, no margin; lists nest
 *
 * The type is the trap: this is the only part of the site that is not Poppins.
 * The copy is Thai and the live site sets IBM Plex Sans Thai for it, so the
 * family is loaded in the root layout and applied here through `--font-thai`.
 *
 * There is no CTA overlap here — the section ends exactly where the footer
 * begins (131 + 2320 = 2451), unlike the article and case-study pages.
 */

import { CtaSection } from "../shared/CtaSection";
import { FloatingHeader } from "../shared/FloatingHeader";
import { SiteFooter } from "../shared/SiteFooter";
import { SiteHeader } from "../shared/SiteHeader";

export interface LegalListItem {
  text: string;
  items?: LegalListItem[];
}

export type LegalBlock =
  | { kind: "h1" | "h2" | "h3" | "p"; text: string }
  | { kind: "list"; items: LegalListItem[] }
  /** An element holding only &nbsp; — deliberate spacing in the source. */
  | { kind: "spacer"; of: string };

export interface LegalPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string | null;
  blocks: LegalBlock[];
}

/** Nested bullets: `disc`, 40px of padding at every level, as measured. */
function List({ items }: { items: LegalListItem[] }) {
  return (
    <ul className="list-disc pl-[40px]">
      {items.map((item, i) => (
        <li key={i} className="text-[16px] leading-[24px]">
          {item.text}
          {item.items?.length ? <List items={item.items} /> : null}
        </li>
      ))}
    </ul>
  );
}

export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav={undefined} />
      <SiteHeader activeNav={undefined} />

      <main className="flex flex-col">
        {/* 1140px box, 60px of vertical padding — narrower than every other page. */}
        <section className="mx-auto w-full max-w-[1220px] px-[24px] py-[60px] tab:px-[40px]">
          <div className="font-thai text-dsg-ink">
            {page.blocks.map((block, i) => {
              if (block.kind === "list") return <List key={i} items={block.items} />;
              if (block.kind === "spacer")
                return block.of === "p" ? (
                  <p key={i} className="mb-[14.4px] text-[16px] leading-[24px]">
                    &nbsp;
                  </p>
                ) : (
                  <h2
                    key={i}
                    aria-hidden
                    className="mt-[8px] mb-[16px] text-[26px] font-medium leading-[32px] desk:text-[32px] desk:leading-[38px]"
                  >
                    &nbsp;
                  </h2>
                );
              if (block.kind === "h1")
                return (
                  <h1
                    key={i}
                    className="mt-[8px] mb-[16px] text-[32px] font-medium leading-[40px] text-dsg-ink desk:text-[40px] desk:leading-[48px]"
                  >
                    {block.text}
                  </h1>
                );
              if (block.kind === "h2" || block.kind === "h3")
                return (
                  <h2
                    key={i}
                    className="mt-[8px] mb-[16px] text-[26px] font-medium leading-[32px] text-dsg-ink desk:text-[32px] desk:leading-[38px]"
                  >
                    {block.text}
                  </h2>
                );
              return (
                <p key={i} className="mb-[14.4px] text-[16px] leading-[24px]">
                  {block.text}
                </p>
              );
            })}
          </div>
        </section>

        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
