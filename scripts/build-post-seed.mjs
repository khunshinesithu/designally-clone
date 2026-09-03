#!/usr/bin/env node
/**
 * Turn the post recon JSON into the seed the site falls back to when Sanity is
 * not configured, rewriting remote image URLs to their local /public paths.
 *
 *   node scripts/build-post-seed.mjs
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IN = join(ROOT, 'docs/research/designally-co-e422ade5/thoughts-e2a689e8/posts.json');
const OUT = join(ROOT, 'sanity/post-details.json');
const PUB = '/sites/designally-co-e422ade5/thoughts-e2a689e8/post-pages';

const localName = (u) =>
  basename(decodeURIComponent(u.split('?')[0])).replace(/[^a-zA-Z0-9._-]/g, '-');
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

const missing = [];
async function image(entry) {
  if (!entry?.url) return null;
  const rel = `${PUB}/${localName(entry.url)}`;
  if (!(await exists(join(ROOT, 'public', rel)))) missing.push(rel);
  return { localPath: rel, alt: entry.alt ?? '', width: entry.width ?? 0, height: entry.height ?? 0 };
}

const posts = JSON.parse(await readFile(IN, 'utf8'));
const out = [];
for (const p of posts) {
  const body = [];
  for (const b of p.body) {
    if (b._type !== 'contentImage') { body.push(b); continue; }
    const img = await image(b);
    if (img) body.push({ _type: 'contentImage', _key: b._key, ...img });
  }
  out.push({
    slug: p.slug,
    title: p.title,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    category: p.category,
    date: p.date,
    featuredImage: await image(p.featuredImage),
    body,
    related: p.related
      ? { slug: p.related.slug, title: p.related.title, image: await image({ url: p.related.imageUrl, alt: p.related.title, width: p.related.width, height: p.related.height }) }
      : null,
  });
}

await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
for (const p of out) {
  const imgs = p.body.filter((b) => b._type === 'contentImage').length;
  const text = p.body.length - imgs;
  console.log(`${p.slug.slice(0, 46).padEnd(48)} text=${String(text).padStart(3)} img=${String(imgs).padStart(2)} rel=${p.related?.slug?.slice(0, 26) ?? 'NONE'}`);
}
console.log(missing.length ? `\n${missing.length} MISSING:\n  ${missing.join('\n  ')}` : '\nAll assets present on disk.');
console.log(`Wrote ${OUT}`);
