import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/sites/designally-co-e422ade5/post-8a4cdd25/ArticleContent";
import { CtaSection } from "@/components/sites/designally-co-e422ade5/shared/CtaSection";
import { FloatingHeader } from "@/components/sites/designally-co-e422ade5/shared/FloatingHeader";
import { SiteFooter } from "@/components/sites/designally-co-e422ade5/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/designally-co-e422ade5/shared/SiteHeader";
import { getPost, getPostSlugs } from "@/sanity/lib/content";

/**
 * Clone of the nine designally.co articles.
 * Site key designally-co-e422ade5, page key post-8a4cdd25.
 *
 * The original serves these at the site root, e.g.
 * https://designally.co/the-basic-fundamentals-of-graphic-design/. The clone
 * nests them under /thoughts/ instead: a root-level catch-all would compete
 * with /about, /works, /services and every future static route. The canonical
 * still points at the original URL.
 *
 * Geometry and the extraction notes are in
 * docs/research/designally-co-e422ade5/thoughts-e2a689e8/article-page.spec.md.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.metaTitle} | DESIGNALLY`,
    description: post.metaDescription ?? undefined,
    alternates: { canonical: `https://designally.co/${slug}/` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="dsg-site flex min-h-screen flex-col">
      <FloatingHeader activeNav="/thoughts/" />
      <SiteHeader activeNav="/thoughts/" />

      <main className="flex flex-col">
        <ArticleContent post={post} />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
