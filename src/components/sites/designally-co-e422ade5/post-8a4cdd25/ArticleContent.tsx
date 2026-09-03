/**
 * designally.co article body — /thoughts/<slug>/.
 *
 * All nine posts are one Elementor `single-post` template, so this is one
 * component rendered nine times from the CMS.
 *
 * Measured on the live "The Basic Fundamentals of Graphic Design" page at
 * 1440x900 (1425px content width):
 *
 *   masthead  display:none on desktop — category and date live here for mobile
 *   featured  y=131  h=775   1200px box, image at its natural aspect
 *   body      y=906  h=varies  800px column centred, padding 96/160
 *   next up   y=6875 h=988   1200px box, padding 160/320, -160 under the wave
 *
 * URL note: the original serves these at the site root
 * (`/the-basic-fundamentals-of-graphic-design/`). The clone nests them under
 * `/thoughts/` instead — a deliberate deviation, so a catch-all route cannot
 * shadow `/about`, `/works` and the rest.
 */

import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { cn } from "@/lib/utils";
import type { PostDetailView } from "@/sanity/lib/content";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-[24px] tab:px-[40px]";
/** The article column: 800px inside the 1200px box, centred. */
const COLUMN = "mx-auto w-full max-w-[800px]";

/**
 * Body styles, all measured from the live article:
 *   p   Poppins 16/24 400, margin-bottom 14.4px
 *   h4  Poppins 24/29 500, margin 8px top / 16px bottom
 * h2 and h3 appear in a few posts and step down from the h1's 48/62.
 *
 * The measured gaps are 62px from a paragraph to the next heading but only 16px
 * from a heading to its paragraph — Elementor puts each heading+paragraph pair
 * in its own widget and spaces the widgets ~40px apart, so the margin between
 * them never collapses. Headings therefore carry `mt-[48px]` (48 + the
 * paragraph's 14.4 = 62.4) and the column below is `flex flex-col`, since flex
 * items do not collapse margins and plain flow would give 14.4px throughout.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-[14.4px] text-[16px] leading-[24px] text-dsg-ink">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-[48px] mb-[16px] text-[32px] font-medium leading-[42px] text-dsg-ink-strong">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-[48px] mb-[16px] text-[28px] font-medium leading-[34px] text-dsg-ink-strong">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-[48px] mb-[16px] text-[24px] font-medium leading-[29px] text-dsg-ink-strong">
        {children}
      </h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-[14.4px] list-disc pl-[24px] text-[16px] leading-[24px] text-dsg-ink">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-[14.4px] list-decimal pl-[24px] text-[16px] leading-[24px] text-dsg-ink">
        {children}
      </ol>
    ),
  },
  listItem: { bullet: ({ children }) => <li className="mb-[4px]">{children}</li> },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-dsg-orange underline-offset-4 hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    // Inline article images run the full column width at their natural aspect.
    contentImage: ({ value }) =>
      value?.src ? (
        <Image
          src={value.src}
          alt={value.alt ?? ""}
          width={value.width || 800}
          height={value.height || 800}
          sizes="(max-width: 880px) 100vw, 800px"
          className="mt-[40px] mb-0 h-auto w-full"
        />
      ) : null,
  },
};

export function ArticleContent({ post }: { post: PostDetailView }) {
  return (
    <>
      {/* Featured image — 1200px box, natural aspect (no crop on the original). */}
      {post.image ? (
        <section className={cn(CONTAINER, "pt-[36px]")}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width || 1536}
            height={post.image.height || 946}
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="h-auto w-full"
          />
        </section>
      ) : null}

      <article className={cn(CONTAINER, "pt-[64px] pb-[100px] desk:pt-[96px] desk:pb-[160px]")}>
        <div className={cn(COLUMN, "flex flex-col")}>
          {/*
            The category/date line. The original's masthead carries it and is
            `display: none` from 1025px up, so this matches that: visible on
            small screens, hidden on desktop where the design omits it.
          */}
          {(post.category || post.date) ? (
            <p className="mb-[16px] text-[18px] leading-[23px] text-[#7278a4] desk:hidden">
              {[post.category, post.date].filter(Boolean).join(" / ")}
            </p>
          ) : null}

          <h1 className="mb-[20px] text-[36px] font-medium leading-[1.25] text-dsg-ink-strong tab:text-[42px] desk:text-[48px] desk:leading-[62px]">
            {post.title}
          </h1>

          <PortableText value={post.body} components={components} />
        </div>
      </article>

      {/*
        Next up. Same -160px tuck under the CTA wave as the case-study pages:
        the live section is `padding: 160px 0 320px` with the wave overlapping.
      */}
      {post.related ? (
        <section className={cn(CONTAINER, "-mb-[160px] pt-[80px] pb-[160px] desk:pt-[160px] desk:pb-[320px]")}>
          <div className="flex flex-col gap-[8px] tab:flex-row tab:items-baseline tab:justify-between">
            <h2 className="text-[32px] font-medium leading-[42px] text-dsg-ink-strong desk:text-[40px] desk:leading-[52px]">
              Next <span className="text-dsg-orange">up</span>
            </h2>
            <Link
              href="/thoughts/"
              className="text-[20px] font-medium leading-[24px] text-dsg-ink-strong transition-colors duration-300 hover:text-dsg-orange"
            >
              Our latest thoughts
            </Link>
          </div>

          {/*
            Two 560px columns, 80px apart (measured: text at x=113, image at
            x=753, both 560 wide). "Read more" sits at the foot of the text
            column, level with the bottom of the 400px image.
          */}
          <Link
            href={`/thoughts/${post.related.slug}/`}
            className="group mt-[56px] flex flex-col gap-[32px] desk:flex-row desk:gap-[80px]"
          >
            <div className="flex flex-col justify-between desk:h-[400px] desk:w-[560px] desk:shrink-0">
              <h3 className="text-[28px] font-medium leading-[38px] text-dsg-ink-strong transition-colors duration-300 group-hover:text-dsg-orange desk:text-[32px]">
                {post.related.title}
              </h3>
              <span className="mt-[16px] inline-block text-[20px] font-medium leading-[26px] text-dsg-orange desk:mt-0">
                Read more
              </span>
            </div>
            {post.related.image ? (
              <div className="relative aspect-[560/400] w-full overflow-hidden desk:h-[400px] desk:w-[560px] desk:shrink-0">
                <Image
                  src={post.related.image.src}
                  alt={post.related.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
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
