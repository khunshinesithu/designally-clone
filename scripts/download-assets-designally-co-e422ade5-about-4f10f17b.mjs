#!/usr/bin/env node
/**
 * Asset downloader for the designally.co /about/ clone.
 * Site key: designally-co-e422ade5 · Page key: about-4f10f17b
 *
 * The 48 client logos on the horizontal scroller’s logo wall.
 *   node scripts/download-assets-designally-co-e422ade5-about-4f10f17b.mjs
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEST = join(ROOT, "public/sites/designally-co-e422ade5/about-4f10f17b/images");
const UPLOADS = "https://designally.co/wp-content/uploads/";
const CONCURRENCY = 6;

const FILES = [
  "2023/08/01-CP-Land_Color.jpg",
  "2023/08/07-Marriot-Resort-Spa_Color.jpg",
  "2023/08/13-Bangkok-Uni_Color.jpg",
  "2023/08/19-Bitazza_Color.jpg",
  "2023/08/25-Airport-of-Thailand_Color.jpg",
  "2023/08/31-Major-Cineplex-_Color.jpg",
  "2023/08/37-DD-Property_Color.jpg",
  "2023/08/43-Aroma-Group_Color.jpg",
  "2023/08/02-Property-Perfect_Color.jpg",
  "2023/08/08-So-Bangkok_Color.jpg",
  "2023/08/14-Chula-Uni_Color.jpg",
  "2023/08/20-StashAway_Color.jpg",
  "2023/08/26-PEA_Color.jpg",
  "2023/08/32-SCG_Color.jpg",
  "2023/08/38-Lazada_Color.jpg",
  "2023/08/44-Chao-Doi_Color.jpg",
  "2023/08/03-SC-Assets_Color.jpg",
  "2023/08/09-Avani-Bangkok_Color.jpg",
  "2023/08/15-Kasetsart-Uni_Color.jpg",
  "2023/08/21-Superrich_Color.jpg",
  "2023/08/27-MCOT_Color.jpg",
  "2023/08/33-Muang-Thai-Insurance_Color.jpg",
  "2023/08/39-Line_Color.jpg",
  "2023/08/45-Fat-Coco_Color.jpg",
  "2023/08/04-K-Village_Color.jpg",
  "2023/08/10-Boonthavorn_Color.jpg",
  "2023/08/16-Thammasart-Uni_Color.jpg",
  "2023/08/22-Transmission_Color.jpg",
  "2023/08/28-INNNews_Color.jpg",
  "2023/08/34-Betagro_Color.jpg",
  "2023/08/40-Pomelo_Color.jpg",
  "2023/08/46-Shinsen-Fish-Market_Color.jpg",
  "2023/08/05-Seacon-Bangkae_Color.jpg",
  "2023/08/11-Villeroy-Boch_Color.jpg",
  "2023/08/17-Sripratum-Uni_Color.jpg",
  "2023/08/23-Unk-Festival_Color.jpg",
  "2023/08/29-Mjets_Color.jpg",
  "2023/08/35-Banpu-Next_Color.jpg",
  "2023/08/41-Zalora_Color.jpg",
  "2023/08/47-Tim-Ho-Wan_Color.jpg",
  "2023/08/06-Siam-Park-City_Color.jpg",
  "2023/08/12-Koze_Color.jpg",
  "2023/08/18-Raffles-Design-Institute_Color.jpg",
  "2023/08/24-Mystic-Valley_Color.jpg",
  "2023/08/30-TST-Party_Color.jpg",
  "2023/08/36-Huawei_Color.jpg",
  "2023/08/42-Mespace_Color.jpg",
  "2023/08/48-Haoma_Color.jpg",
];

const localName = (u) => basename(decodeURIComponent(u.split("?")[0])).replace(/[^a-zA-Z0-9._-]/g, "-");
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function download(path) {
  const url = UPLOADS + path;
  const dest = join(DEST, localName(url));
  if (await exists(dest)) return `skip ${localName(url)}`;
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      referer: "https://designally.co/about/",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error(`empty body — ${url}`);
  await mkdir(DEST, { recursive: true });
  await writeFile(dest, buf);
  return `${localName(url)} (${(buf.length / 1024).toFixed(0)}kb)`;
}

let failed = 0;
for (let i = 0; i < FILES.length; i += CONCURRENCY) {
  const out = await Promise.allSettled(FILES.slice(i, i + CONCURRENCY).map(download));
  out.forEach((r, j) => {
    if (r.status === "fulfilled") console.log("  " + r.value);
    else { failed++; console.error(`  FAILED ${FILES[i + j]} — ${r.reason.message}`); }
  });
}
console.log(`\n${FILES.length - failed} ok, ${failed} failed`);
if (failed) process.exitCode = 1;
