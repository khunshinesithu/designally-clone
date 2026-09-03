#!/usr/bin/env node
/**
 * Asset downloader for the nine designally.co blog post pages.
 * Site key: designally-co-e422ade5 · Page key: thoughts-e2a689e8 (post-pages)
 *
 * Reads the URLs out of the recon JSON so the two cannot drift apart.
 *
 *   node scripts/extract-posts.mjs --in <dir of saved html>
 *   node scripts/download-assets-designally-co-e422ade5-posts.mjs
 */
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEST = join(ROOT, 'public/sites/designally-co-e422ade5/thoughts-e2a689e8/post-pages');
const DATA = join(ROOT, 'docs/research/designally-co-e422ade5/thoughts-e2a689e8/posts.json');
const CONCURRENCY = 5;

const posts = JSON.parse(await readFile(DATA, 'utf8'));
const urls = new Set();
for (const p of posts) {
  if (p.featuredImage) urls.add(p.featuredImage.url);
  for (const b of p.body) if (b._type === 'contentImage' && b.url) urls.add(b.url);
  if (p.related?.imageUrl) urls.add(p.related.imageUrl);
}

const localName = (u) =>
  basename(decodeURIComponent(u.split('?')[0])).replace(/[^a-zA-Z0-9._-]/g, '-');
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function download(url) {
  const dest = join(DEST, localName(url));
  if (await exists(dest)) return `skip ${localName(url)}`;
  const res = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      referer: 'https://designally.co/thoughts/',
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error(`empty body — ${url}`);
  await mkdir(DEST, { recursive: true });
  await writeFile(dest, buf);
  return `${localName(url)} (${(buf.length / 1024).toFixed(0)}kb)`;
}

const list = [...urls];
console.log(`${list.length} distinct images from ${posts.length} posts\n`);
let failed = 0;
for (let i = 0; i < list.length; i += CONCURRENCY) {
  const out = await Promise.allSettled(list.slice(i, i + CONCURRENCY).map(download));
  out.forEach((r, j) => {
    if (r.status === 'fulfilled') console.log('  ' + r.value);
    else { failed++; console.error(`  FAILED ${list[i + j]} — ${r.reason.message}`); }
  });
}
console.log(`\n${list.length - failed} ok, ${failed} failed`);
if (failed) process.exitCode = 1;
