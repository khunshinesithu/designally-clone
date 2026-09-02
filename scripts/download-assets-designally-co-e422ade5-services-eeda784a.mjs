#!/usr/bin/env node
/**
 * Asset downloader for the designally.co /services/ clone.
 * Site key: designally-co-e422ade5 · Page key: services-eeda784a
 *
 * The hero background video plus the four DIVE/DEFINE/DESIGN/DELIVER process icons.
 * The five service-card images are NOT re-downloaded — /services/ uses the same
 * brandcore / brandvisual / brandexc / website / designsupport files the homepage
 * already holds under root-8a5edab2/images/.
 *   node scripts/download-assets-designally-co-e422ade5-services-eeda784a.mjs
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = join(ROOT, 'public/sites/designally-co-e422ade5/services-eeda784a');
const UPLOADS = 'https://designally.co/wp-content/uploads/';

const IMAGES = [
  '2023/07/Designally_Our-service_icon-Dive.png',
  '2023/07/Designally_Our-service_icon-Define.png',
  '2023/07/Designally_Our-service_icon-Design.png',
  '2023/07/Designally_Our-service_icon-Deliver.png',
];
const VIDEOS = ['2023/08/G-22.mp4'];

const localName = (u) => basename(decodeURIComponent(u.split('?')[0])).replace(/[^a-zA-Z0-9._-]/g, '-');
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function download(path, destDir) {
  const url = UPLOADS + path;
  const dest = join(destDir, localName(url));
  if (await exists(dest)) return `skip ${localName(url)}`;
  const res = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      referer: 'https://designally.co/services/',
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error(`empty body — ${url}`);
  await mkdir(destDir, { recursive: true });
  await writeFile(dest, buf);
  return `${localName(url)} (${(buf.length / 1024).toFixed(0)}kb)`;
}

let failed = 0;
for (const [list, dir] of [[IMAGES, join(BASE, 'images')], [VIDEOS, join(BASE, 'videos')]]) {
  const out = await Promise.allSettled(list.map((f) => download(f, dir)));
  out.forEach((r, i) => {
    if (r.status === 'fulfilled') console.log('  ' + r.value);
    else { failed++; console.error(`  FAILED ${list[i]} — ${r.reason.message}`); }
  });
}
console.log(`\n${IMAGES.length + VIDEOS.length - failed} ok, ${failed} failed`);
if (failed) process.exitCode = 1;
