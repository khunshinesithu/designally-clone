import type { Metadata } from "next";

import {
  CategoryPage,
  postsInCategory,
} from "@/components/sites/designally-co-e422ade5/thoughts-e2a689e8/CategoryPage";
import { getPosts } from "@/sanity/lib/content";

/**
 * Clone of https://designally.co/thoughts/tips/ — the /thoughts/ listing
 * filtered to Tips.
 *
 * A static segment, so it wins over the sibling /thoughts/[slug]/ article route.
 */

export const metadata: Metadata = {
  title: "Tips | DESIGNALLY",
  alternates: { canonical: "https://designally.co/thoughts/tips/" },
};

export default async function TipsPage() {
  const posts = await getPosts();
  return (
    <CategoryPage
      posts={postsInCategory(posts, "tips").map((p) => ({ ...p, src: p.imageUrl }))}
      category="tips"
    />
  );
}
