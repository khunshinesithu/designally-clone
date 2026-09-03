import type { Metadata } from "next";

import {
  CategoryPage,
  postsInCategory,
} from "@/components/sites/designally-co-e422ade5/thoughts-e2a689e8/CategoryPage";
import { getPosts } from "@/sanity/lib/content";

/**
 * Clone of https://designally.co/thoughts/knowledge/ — the /thoughts/ listing
 * filtered to Knowledge.
 *
 * A static segment, so it wins over the sibling /thoughts/[slug]/ article route.
 */

export const metadata: Metadata = {
  title: "Knowledge | DESIGNALLY",
  alternates: { canonical: "https://designally.co/thoughts/knowledge/" },
};

export default async function KnowledgePage() {
  const posts = await getPosts();
  return (
    <CategoryPage
      posts={postsInCategory(posts, "knowledge").map((p) => ({ ...p, src: p.imageUrl }))}
      category="knowledge"
    />
  );
}
