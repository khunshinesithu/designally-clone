#!/usr/bin/env node
/**
 * One-off: upload the local images to Sanity and create the documents that
 * replace the hardcoded arrays.
 *
 * Prerequisites (see the CMS section of README.md):
 *   .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 *   and SANITY_API_WRITE_TOKEN (Editor role).
 *
 *   node scripts/extract-seed-data.mjs      # writes sanity/seed-data.json
 *   node scripts/migrate-to-sanity.mjs --dry-run
 *   node scripts/migrate-to-sanity.mjs
 *
 * Safe to re-run. Documents use deterministic ids, so a second run updates the
 * same records instead of creating duplicates, and images already uploaded are
 * reused rather than uploaded again.
 */
import { createClient } from '@sanity/client';
import { createReadStream } from 'node:fs';
import { readFile, access } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRY_RUN = process.argv.includes('--dry-run');

// --- env --------------------------------------------------------------------

async function loadEnvLocal() {
  try {
    const raw = await readFile(join(ROOT, '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    }
  } catch {
    // No .env.local — fall back to whatever is already in the environment.
  }
}

function requireEnv(name, hint) {
  const value = process.env[name];
  if (!value) {
    console.error(`\nMissing ${name}.\n${hint}\n`);
    process.exit(1);
  }
  return value;
}

// --- helpers ----------------------------------------------------------------

/** Stable, readable document id so re-runs update rather than duplicate. */
function docId(type, key) {
  const slug = key
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return `${type}-${slug}`;
}

const exists = async (p) => {
  try { await access(p); return true; } catch { return false; }
};

async function main() {
  await loadEnvLocal();

  const projectId = requireEnv(
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'Run `npx sanity init` first, then copy .env.example to .env.local and fill it in.',
  );
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const token = DRY_RUN
    ? undefined
    : requireEnv(
        'SANITY_API_WRITE_TOKEN',
        'Create one at https://sanity.io/manage → your project → API → Tokens (Editor role),\n' +
          'then add it to .env.local. Do not commit it.',
      );

  const seed = JSON.parse(await readFile(join(ROOT, 'sanity/seed-data.json'), 'utf8'));

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-10-01',
    token,
    useCdn: false,
  });

  console.log(`project ${projectId} · dataset ${dataset}${DRY_RUN ? ' · DRY RUN' : ''}\n`);

  // --- images -------------------------------------------------------------
  // Upload each distinct file once; several documents share the same image.
  const uploads = new Map(); // localPath -> asset._id
  const allPaths = [
    ...seed.workItems, ...seed.caseStudies, ...seed.services, ...seed.posts,
  ].map((e) => e.localPath).filter(Boolean);
  const distinct = [...new Set(allPaths)];

  console.log(`Images: ${distinct.length} distinct files (${allPaths.length} references)`);

  for (const [i, localPath] of distinct.entries()) {
    const abs = join(ROOT, 'public', localPath);
    if (!(await exists(abs))) {
      console.error(`  MISSING ON DISK  ${localPath}`);
      process.exitCode = 1;
      continue;
    }
    if (DRY_RUN) { uploads.set(localPath, `dry-run-${i}`); continue; }

    const filename = basename(localPath);
    // Reuse an identical upload if the dataset already has one.
    const existing = await client.fetch(
      '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id',
      { filename },
    );
    if (existing) {
      uploads.set(localPath, existing);
      console.log(`  [${i + 1}/${distinct.length}] reuse  ${filename}`);
      continue;
    }
    const asset = await client.assets.upload('image', createReadStream(abs), { filename });
    uploads.set(localPath, asset._id);
    console.log(`  [${i + 1}/${distinct.length}] upload ${filename}`);
  }

  const imageRef = (localPath) =>
    localPath && uploads.has(localPath)
      ? { _type: 'image', asset: { _type: 'reference', _ref: uploads.get(localPath) } }
      : undefined;

  // --- documents ----------------------------------------------------------
  const docs = [
    ...seed.workItems.map((w) => ({
      _id: docId('workItem', w.file),
      _type: 'workItem',
      title: w.title,
      image: imageRef(w.localPath),
      alt: w.alt,
      categories: w.categories,
      showOnHome: w.showOnHome,
      order: w.order,
    })),
    ...seed.caseStudies.map((c) => ({
      _id: docId('caseStudy', c.client),
      _type: 'caseStudy',
      client: c.client,
      industry: c.industry,
      services: c.services,
      href: c.href,
      image: imageRef(c.localPath),
      alt: c.alt,
      showOnHome: c.showOnHome,
      order: c.order,
    })),
    ...seed.services.map((s) => ({
      _id: docId('service', `${s.page}-${s.title}`),
      _type: 'service',
      page: s.page,
      eyebrow: s.eyebrow,
      title: s.title,
      italicLetter: s.italicLetter ?? undefined,
      description: s.description,
      tags: s.tags?.length ? s.tags : undefined,
      anchorId: s.anchorId ?? undefined,
      image: imageRef(s.localPath),
      alt: s.alt,
      order: s.order,
    })),
    ...seed.posts.map((p) => ({
      _id: docId('post', p.title),
      _type: 'post',
      title: p.title,
      href: p.href,
      categories: p.categories,
      date: p.date,
      image: imageRef(p.localPath),
      alt: p.alt,
      order: p.order,
    })),
  ];

  console.log(`\nDocuments: ${docs.length}`);
  const byType = docs.reduce((acc, d) => ({ ...acc, [d._type]: (acc[d._type] ?? 0) + 1 }), {});
  for (const [type, n] of Object.entries(byType)) console.log(`  ${type.padEnd(12)} ${n}`);

  if (DRY_RUN) {
    console.log('\nDry run — nothing was written. Re-run without --dry-run to apply.');
    return;
  }

  // createOrReplace keeps ids stable, so re-running is idempotent.
  let tx = client.transaction();
  let pending = 0;
  for (const doc of docs) {
    tx = tx.createOrReplace(doc);
    if (++pending === 50) { await tx.commit(); tx = client.transaction(); pending = 0; }
  }
  if (pending) await tx.commit();

  console.log('\nDone. Open /studio to review.');
}

main().catch((err) => {
  console.error(`\n${err.message}`);
  process.exit(1);
});
