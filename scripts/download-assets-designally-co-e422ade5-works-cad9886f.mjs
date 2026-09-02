#!/usr/bin/env node
/**
 * Asset downloader for the designally.co /works/ clone.
 * Site key: designally-co-e422ade5 · Page key: works-cad9886f
 *
 * 74 gallery tiles plus the two case-study covers (Nourigo, Fatcoco) that the
 * homepage's four-card grid does not already provide.
 *   node scripts/download-assets-designally-co-e422ade5-works-cad9886f.mjs
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEST = join(ROOT, 'public/sites/designally-co-e422ade5/works-cad9886f/images');
const UPLOADS = 'https://designally.co/wp-content/uploads/';
const CONCURRENCY = 5;

const FILES = [
  "2023/10/Charmy_IG_Designally-Post_2-2-scaled.jpg",
  "2023/10/Designally-Logo-design-foodie.jpg",
  "2023/10/Designally-Logo-design-tattva.jpg",
  "2023/10/Designally-Logo-design-sofresh.jpg",
  "2023/10/Designally-Logo-design-sook-sabai-spa.jpg",
  "2023/10/Designally-Logo-design-De-Vineri.jpg",
  "2023/10/Designally-Logo-design-Utopia-group.jpg",
  "2023/10/Designally-Logo-design-Success-group.jpg",
  "2023/10/Pet-Party-1080x1920px-1.jpg",
  "2023/10/Nanobag-1080x1920px-1.jpg",
  "2023/10/Rak-Mao-1080x1920px-1.jpg",
  "2023/10/PEA-1080x1920px-1.jpg",
  "2023/10/Thai-Gem-Center_IG-Post_Post_3-2-scaled.jpg",
  "2023/10/ThaiGem_IG-Post_edit.jpg",
  "2023/10/ThaiGem_IG-Post_Post_5-1-e1697706345846.png",
  "2023/10/Thai-Gem-Center_IG-Post_Post_3-1-scaled.jpg",
  "2023/10/Seacon-Pro-_IG-Post-03-scaled.jpg",
  "2023/10/Seacon-Pro-_IG-Post-02-scaled.jpg",
  "2023/10/Seacon-Pro-_IG-Post-09-scaled.jpg",
  "2023/10/Seacon-Pro-_IG-Post-08-scaled.jpg",
  "2023/10/insight-ERA_2-1-scaled.jpg",
  "2023/10/insight-ERA_3-2.jpg",
  "2023/10/insight-ERA_1-1-scaled.jpg",
  "2023/10/insight-ERA_1-2-1-scaled.jpg",
  "2023/10/Pomelo-Career-web-search-scaled.jpg",
  "2023/10/Pomelo-Career-web-linked-in-scaled.jpg",
  "2023/10/Mjets-website-mockup-scaled-e1697708818477.jpg",
  "2023/10/Mjets-website-mockup-1-scaled-e1697708999896.jpg",
  "2023/10/Designally-websiteHuawei-1.webp",
  "2023/10/Designally-websiteHuawei-2.webp",
  "2023/10/UNK-2023-Poster_SQ.jpg",
  "2023/10/UNK-Gathering-Poster_SQ.jpg",
  "2023/10/72653360_2434651543239312_6881135772582281216_n.jpg",
  "2023/10/69078711_2335796459791488_7838476904754577408_n.jpg",
  "2023/10/68273449_2310893275615140_2687913807988129792_n.jpg",
  "2023/10/72427118_2432596203444846_836697455037775872_n.jpg",
  "2023/10/347781850_6051770704949177_5622929737336053476_n-scaled.jpg",
  "2023/10/362920442_217355491291134_2956835042896295031_n.jpg",
  "2023/10/350535470_979839496781451_4827950317788281151_n-scaled.jpg",
  "2023/10/344592478_942011020175548_2643397633021433264_n-scaled.jpg",
  "2023/10/321510853_919714646060157_7852334830676686906_n-scaled.jpg",
  "2023/10/309124222_3151686321709946_5363095839493191081_n-scaled.jpg",
  "2023/10/341512966_3135348480095781_5143699826467741173_n.jpg",
  "2023/10/386333010_806807051447230_4964043443090435321_n.jpg",
  "2023/10/%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%88%E0%B8%AD%E0%B8%9A-3.jpg",
  "2023/10/%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%88%E0%B8%AD%E0%B8%9A-2.jpg",
  "2023/10/%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%88%E0%B8%AD%E0%B8%9A-5.jpg",
  "2023/10/%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%88%E0%B8%AD%E0%B8%9A-4.jpg",
  "2023/10/Inlingua-thailand-social-media-1.jpg",
  "2023/10/Inlingua-thailand-social-media-3.jpg",
  "2023/10/Inlingua-thailand-social-media-4.jpg",
  "2023/10/Inlingua-thailand-social-media-2.jpg",
  "2023/10/Designally-Packagin-Khao-San-Tham-2-scaled-e1697795457619.jpg",
  "2023/10/Designally-Packagin-Khao-San-Tham-1-scaled-e1697795482881.jpg",
  "2023/10/Designally-Packaging-De-Vineri-1-scaled.jpg",
  "2023/10/Designally-Packaging-De-Vineri-2-scaled.jpg",
  "2025/01/Designally_Packaging_Albotross_6-1.jpg",
  "2025/01/Designally_Packaging_Albotross_2.jpg",
  "2025/01/Designally_Packaging_Albotross_1.jpg",
  "2025/01/Designally_Packaging_Albotross_4-6.jpg",
  "2025/01/Designally_Packaging_Omakase-Don-08.png",
  "2025/01/Designally_Packaging_Omakase-Don-04.png",
  "2025/01/Designally_Logo_Packaging_Woonae_Lipstick_1.jpg",
  "2025/01/Designally_Logo_Packaging_Woonae_Eye-shadow-2.jpg",
  "2025/01/Designally_Logo-Design_MANA_IG_Post_1-1.jpg",
  "2025/01/Designally_Logo-Design_MANA_IG_Post_8.jpg",
  "2025/01/Designally_Logo-Design_Ergonoz_IG_post_2-1.jpg",
  "2025/01/Designally_Logo-Design_Ergonoz_IG_post_1-2.jpg",
  "2025/01/Designally_Logo-Design_Ergonoz_IG_post_1-1.jpg",
  "2025/01/Designally_Logo-Design_Ergonoz_IG_post_3-2.jpg",
  "2025/01/Designally_Logo-Design_ALOKIO_Social-Media_1.jpg",
  "2025/01/Designally_Logo-Design_ALOKIO_Social-Media_9.jpg",
  "2025/01/Designally_Logo-Design_ALOKIO_Social-Media_11.jpg",
  "2025/01/Designally_Logo-Design_ALOKIO_Social-Media_6.jpg",
  "2023/08/Nourigo-1024x576.jpg",
  "2023/08/Fatcoco-1024x576.jpg",
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
      referer: 'https://designally.co/works/',
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
  const batch = FILES.slice(i, i + CONCURRENCY);
  const out = await Promise.allSettled(batch.map(download));
  out.forEach((r, j) => {
    if (r.status === 'fulfilled') console.log('  ' + r.value);
    else { failed++; console.error(`  FAILED ${batch[j]} — ${r.reason.message}`); }
  });
}
console.log(`\n${FILES.length - failed} ok, ${failed} failed`);
if (failed) process.exitCode = 1;
