/**
 * designally.co category listings — /thoughts/knowledge/ and /thoughts/tips/.
 *
 * The same `wp-page` template as /thoughts/, filtered: five posts each, with
 * the matching tab in orange. Nothing else differs, so both routes render this.
 *
 * These live as explicit route segments rather than inside /thoughts/[slug]/.
 * Next matches a static segment before a dynamic sibling, so /thoughts/tips/
 * resolves here while /thoughts/the-basic-fundamentals-of-graphic-design/ falls
 * through to the article route.
 */

import { CtaSection } from "../shared/CtaSection";
import { FloatingHeader } from "../shared/FloatingHeader";
import { SiteFooter } from "../shared/SiteFooter";
import { SiteHeader } from "../shared/SiteHeader";
import { ThoughtsPage, type ThoughtPost, type ThoughtsCategory } from "./ThoughtsPage";

/**
 * A post belongs to a category when the category appears in its comma-separated
 * `categories` string. One post carries both ("Knowledge, Tips, Uncategorized
 * @th"), so it appears in both listings — which is what the original does.
 */
export function postsInCategory<T extends { categories: string }>(
  posts: readonly T[],
  category: Exclude<ThoughtsCategory, "all">,
): T[] {
  return posts.filter((p) =>
    p.categories
      .split(",")
      .map((c) => c.trim().toLowerCase())
      .includes(category),
  );
}

export function CategoryPage({
  posts,
  category,
}: {
  posts: readonly ThoughtPost[];
  category: Exclude<ThoughtsCategory, "all">;
}) {
  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/thoughts/" />
      <SiteHeader activeNav="/thoughts/" />

      <main className="flex flex-col">
        <ThoughtsPage posts={posts} activeCategory={category} />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
