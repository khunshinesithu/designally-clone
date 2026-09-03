#!/usr/bin/env node
/**
 * Asset downloader for the six designally.co project case-study pages.
 * Site key: designally-co-e422ade5 · Page key: works-cad9886f (case-studies)
 *
 * Unlike the other downloaders this one takes no hardcoded list: it reads the
 * URLs out of the recon JSON, so re-running the extractor and re-running this
 * cannot drift apart.
 *
 *   node scripts/extract-case-studies.mjs --in <dir of saved html>
 *   node scripts/download-assets-designally-co-e422ade5-case-studies.mjs
 *
 * The hero backgrounds are YouTube embeds on the original and stay embeds —
 * nothing to download for those.
 */
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = join(ROOT, 'public/sites/designally-co-e422ade5/case-studies');
const DATA = join(ROOT, 'docs/research/designally-co-e422ade5/works-cad9886f/case-studies.json');
const CONCURRENCY = 4;

const pages = JSON.parse(await readFile(DATA, 'utf8'));

/** Every remote asset, tagged with the sub-folder it belongs in. */
const assets = [];
for (const p of pages) {
  for (const b of p.gallery) {
    if (b.kind === 'video') assets.push({ url: b.url, kind: 'videos' });
    else for (const i of b.images) assets.push({ url: i.url, kind: 'images' });
  }
  if (p.nextUp.imageUrl) assets.push({ url: p.nextUp.imageUrl, kind: 'images' });
}

const localName = (u) =>
  basename(decodeURIComponent(u.split('?')[0])).replace(/[^a-zA-Z0-9._-]/g, '-');

// Several pages share a cover (each "Next up" image is another project's), so
// dedupe by destination rather than downloading the same file repeatedly.
const unique = new Map();
for (const a of assets) unique.set(`${a.kind}/${localName(a.url)}`, a);

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function download({ url, kind }) {
  const dest = join(BASE, kind, localName(url));
  if (await exists(dest)) return `skip ${localName(url)}`;
  const res = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      referer: 'https://designally.co/works/',
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error(`empty body — ${url}`);
  await mkdir(join(BASE, kind), { recursive: true });
  await writeFile(dest, buf);
  return `${kind}/${localName(url)} (${(buf.length / 1024).toFixed(0)}kb)`;
}

const list = [...unique.values()];
console.log(`${list.length} distinct assets from ${pages.length} pages\n`);
let failed = 0;
for (let i = 0; i < list.length; i += CONCURRENCY) {
  const batch = list.slice(i, i + CONCURRENCY);
  const out = await Promise.allSettled(batch.map(download));
  out.forEach((r, j) => {
    if (r.status === 'fulfilled') console.log('  ' + r.value);
    else { failed++; console.error(`  FAILED ${batch[j].url} — ${r.reason.message}`); }
  });
}
console.log(`\n${list.length - failed} ok, ${failed} failed`);
if (failed) process.exitCode = 1;
