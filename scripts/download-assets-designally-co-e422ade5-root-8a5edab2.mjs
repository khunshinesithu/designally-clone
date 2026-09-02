#!/usr/bin/env node
/**
 * Asset downloader for the designally.co (/) clone.
 *
 * Site key: designally-co-e422ade5
 * Page key: root-8a5edab2
 *
 * Reads the extraction artifacts written during Phase 1 and downloads every image,
 * video and SEO asset into this page's namespaced public directory. Never writes
 * outside `public/sites/designally-co-e422ade5/`.
 *
 *   node scripts/download-assets-designally-co-e422ade5-root-8a5edab2.mjs
 */

import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { dirname, join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_KEY = 'designally-co-e422ade5';
const PAGE_KEY = 'root-8a5edab2';

const RESEARCH = join(ROOT, 'docs/research', SITE_KEY, PAGE_KEY);
const PAGE_ASSETS = join(ROOT, 'public/sites', SITE_KEY, PAGE_KEY);
const SHARED_ASSETS = join(ROOT, 'public/sites', SITE_KEY, 'shared');

const CONCURRENCY = 4;

/** Elementor stores the raw JSON string inside a JSON string. */
async function readDoubleEncoded(file) {
  return JSON.parse(JSON.parse(await readFile(join(RESEARCH, file), 'utf8')));
}

/** Stable, filesystem-safe name derived from the upload path. */
function localName(url) {
  const clean = decodeURIComponent(url.split('?')[0]);
  const name = basename(clean);
  return name.replace(/[^a-zA-Z0-9._-]/g, '-');
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function download(url, destDir) {
  const dest = join(destDir, localName(url));
  if (await exists(dest)) return { url, dest, skipped: true };

  const res = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      referer: 'https://designally.co/',
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) throw new Error(`empty body — ${url}`);

  await mkdir(destDir, { recursive: true });
  await writeFile(dest, buf);
  return { url, dest, bytes: buf.length };
}

/** Batched parallel downloads — CONCURRENCY at a time. */
async function downloadAll(urls, destDir, label) {
  const list = [...new Set(urls)].filter(Boolean);
  const ok = [];
  const failed = [];

  for (let i = 0; i < list.length; i += CONCURRENCY) {
    const batch = list.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(batch.map((u) => download(u, destDir)));
    results.forEach((r, j) => {
      if (r.status === 'fulfilled') {
        ok.push(r.value);
        const tag = r.value.skipped ? 'skip' : `${(r.value.bytes / 1024).toFixed(0)}kb`;
        console.log(`  [${label}] ${localName(batch[j])} (${tag})`);
      } else {
        failed.push({ url: batch[j], error: r.reason.message });
        console.error(`  [${label}] FAILED ${batch[j]} — ${r.reason.message}`);
      }
    });
  }
  return { ok, failed };
}

const UPLOADS = 'https://designally.co/wp-content/uploads/';

async function main() {
  const global = await readDoubleEncoded('global-extract.json');
  const works = await readDoubleEncoded('works-items.json');

  const images = [
    ...global.images.map((i) => i.src),
    ...works.items.map((i) => (i.img ? UPLOADS + i.img : null)),
  ].filter(Boolean);

  const videos = global.videos.map((v) => v.src).filter(Boolean);

  const seo = [
    ...global.favicons.map((f) => f.href),
    ...global.meta.og
      .filter((o) => o.startsWith('og:image='))
      .map((o) => o.slice('og:image='.length)),
  ].filter((u) => /^https?:\/\//.test(u));

  console.log(`Images (${new Set(images).size} unique):`);
  const imgRes = await downloadAll(images, join(PAGE_ASSETS, 'images'), 'img');

  console.log(`\nVideos (${new Set(videos).size} unique):`);
  const vidRes = await downloadAll(videos, join(PAGE_ASSETS, 'videos'), 'vid');

  console.log(`\nSEO assets (${new Set(seo).size} unique):`);
  const seoRes = await downloadAll(seo, join(SHARED_ASSETS, 'seo'), 'seo');

  const failed = [...imgRes.failed, ...vidRes.failed, ...seoRes.failed];

  console.log('\n--- summary ---');
  console.log(`images: ${imgRes.ok.length} ok`);
  console.log(`videos: ${vidRes.ok.length} ok`);
  console.log(`seo:    ${seoRes.ok.length} ok`);
  console.log(`failed: ${failed.length}`);

  if (failed.length) {
    console.log('\nUnrecoverable assets (record these in ARTIFACT_MANIFEST.md):');
    failed.forEach((f) => console.log(`  ${f.url} — ${f.error}`));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
