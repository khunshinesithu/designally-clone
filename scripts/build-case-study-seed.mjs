#!/usr/bin/env node
/**
 * Turn the case-study recon JSON into the seed the site falls back to when
 * Sanity is not configured, rewriting every remote URL to its local path under
 * /public. Mirrors what sanity/seed-data.json does for the other collections.
 *
 *   node scripts/build-case-study-seed.mjs
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IN = join(ROOT, 'docs/research/designally-co-e422ade5/works-cad9886f/case-studies.json');
const OUT = join(ROOT, 'sanity/case-study-details.json');
const PUB = '/sites/designally-co-e422ade5/case-studies';

const localName = (u) =>
  basename(decodeURIComponent(u.split('?')[0])).replace(/[^a-zA-Z0-9._-]/g, '-');
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

const missing = [];
async function localPath(url, kind) {
  const rel = `${PUB}/${kind}/${localName(url)}`;
  if (!(await exists(join(ROOT, 'public', rel)))) missing.push(rel);
  return rel;
}
/** Dimensions come from the width/height WordPress puts on every <img>. */
async function imageEntry(url, alt, width, height) {
  return {
    localPath: await localPath(url, 'images'),
    alt: alt ?? '',
    width: width ?? 0,
    height: height ?? 0,
  };
}

const pages = JSON.parse(await readFile(IN, 'utf8'));
const out = [];
for (const p of pages) {
  const gallery = [];
  for (const b of p.gallery) {
    if (b.kind === 'video') {
      gallery.push({
        kind: 'video',
        localPath: await localPath(b.url, 'videos'),
        width: b.width ?? 0,
        height: b.height ?? 0,
      });
    } else {
      gallery.push({
        kind: 'row',
        columns: b.columns,
        images: await Promise.all(b.images.map((i) => imageEntry(i.url, i.alt, i.width, i.height))),
      });
    }
  }
  out.push({
    slug: p.slug,
    client: p.client,
    title: p.title,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    heroVideoUrl: p.hero.videoUrl,
    body: p.body,
    visitLabel: p.visit?.label ?? null,
    visitHref: p.visit?.href ?? null,
    industry: p.meta.industry,
    services: p.meta.service,
    duration: p.meta.duration,
    tags: p.tags,
    gallery,
    nextUpSlug: p.nextUp.slug,
    nextUpClient: p.nextUp.client,
    nextUpImage: p.nextUp.imageUrl
      ? await imageEntry(p.nextUp.imageUrl, `${p.nextUp.client} project`, p.nextUp.width, p.nextUp.height)
      : null,
  });
}

await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
for (const p of out) {
  const media = p.gallery.reduce((n, b) => n + (b.kind === 'video' ? 1 : b.images.length), 0);
  console.log(`${p.slug.padEnd(42)} body=${p.body.length} tags=${String(p.tags.length).padStart(2)} media=${String(media).padStart(2)} next=${p.nextUpSlug}`);
}
console.log(missing.length ? `\n${missing.length} MISSING on disk:\n  ${missing.join('\n  ')}` : '\nAll assets present on disk.');
console.log(`Wrote ${OUT}`);
