#!/usr/bin/env node
/**
 * Asset downloader for the designally.co /thoughts/ clone.
 * Site key: designally-co-e422ade5 · Page key: thoughts-e2a689e8
 *
 * The nine post thumbnails, taken at the 1536w size the live listing actually renders.
 *   node scripts/download-assets-designally-co-e422ade5-thoughts-e2a689e8.mjs
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEST = join(ROOT, 'public/sites/designally-co-e422ade5/thoughts-e2a689e8/images');
const UPLOADS = 'https://designally.co/wp-content/uploads/';

const FILES = [
  '2024/07/Albotroos-packaging-design-by-Designally-design-agency-bangkok-2-1536x904.jpg',
  '2024/06/strong_brand_identity_cover-1536x1097.jpg',
  '2023/11/Content_1_Shared-Image-1536x804.webp',
  '2023/08/5.0-1536x946.png',
  '2023/08/4.0-1536x946.png',
  '2023/08/3-1536x946.png',
  '2023/08/The-Basic-Fundamentals-of-Graphic-Design_feature-1536x946.jpg',
  '2023/08/Frame-942-1536x1015.png',
  '2023/07/Frame-9421-1536x1015.png',
  // up_right_arrow.svg is byte-identical to the shared ArrowUpRightIcon — reuse that instead.
];

const localName = (u) => basename(decodeURIComponent(u.split('?')[0])).replace(/[^a-zA-Z0-9._-]/g, '-');
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function download(path) {
  const url = UPLOADS + path;
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

const results = await Promise.allSettled(FILES.map(download));
let failed = 0;
results.forEach((r, i) => {
  if (r.status === 'fulfilled') console.log('  ' + r.value);
  else { failed++; console.error(`  FAILED ${FILES[i]} — ${r.reason.message}`); }
});
console.log(`\n${results.length - failed} ok, ${failed} failed`);
if (failed) process.exitCode = 1;
