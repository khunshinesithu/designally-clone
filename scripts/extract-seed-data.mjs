#!/usr/bin/env node
/**
 * One-off: lift the hardcoded content out of the components into a plain JSON
 * seed, so `migrate-to-sanity.mjs` has something reviewable to import.
 *
 * The arrays live inside `.tsx` files and reference local path constants via
 * template literals, so this resolves those constants, then evaluates the array
 * literal on its own. It reads our own source only — nothing from the network.
 *
 *   node scripts/extract-seed-data.mjs
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'src/components/sites/designally-co-e422ade5';

/** Pull `const NAME = [ ... ];` out of a source file and evaluate it. */
async function readArray(relPath, name, constants = {}) {
  const src = await readFile(join(ROOT, relPath), 'utf8');
  const decl = new RegExp(`(export\\s+)?const\\s+${name}\\b[^=]*?=\\s*\\[`);
  const match = decl.exec(src);
  if (!match) throw new Error(`${name} not found in ${relPath}`);

  // The opening bracket is the LAST one in the matched declaration — anything
  // earlier belongs to the type annotation (`readonly ThoughtPost[]`).
  const open = match.index + match[0].lastIndexOf('[');
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end === -1) throw new Error(`Unbalanced array literal for ${name} in ${relPath}`);

  let literal = src.slice(open, end);

  // Resolve `${IDENT}` interpolations by finding `const IDENT = "..."` in the
  // same file. Discovering them beats hardcoding names that drift per file.
  const resolved = { ...constants };
  for (const m of src.matchAll(/const\s+([A-Z][A-Z0-9_]*)\s*=\s*["'`]([^"'`]*)["'`]/g)) {
    resolved[m[1]] ??= m[2];
  }
  literal = literal.replace(/\$\{([A-Za-z_$][\w$]*)\}/g, (whole, ident) => {
    if (ident in resolved) return resolved[ident];
    throw new Error(`${relPath}: no value found for \${${ident}} used inside ${name}`);
  });
  // Strip TS satisfies/as clauses that can trail entries.
  literal = literal.replace(/\s+as const/g, '');

  try {
    return new Function(`return (${literal});`)();
  } catch (err) {
    throw new Error(`Could not evaluate ${name} from ${relPath}: ${err.message}`);
  }
}

const IMAGES = {
  root: '/sites/designally-co-e422ade5/root-8a5edab2/images',
  works: '/sites/designally-co-e422ade5/works-cad9886f/images',
  thoughts: '/sites/designally-co-e422ade5/thoughts-e2a689e8/images',
};

async function main() {
  // --- work items -------------------------------------------------------
  const homeItems = await readArray(`${SITE}/root-8a5edab2/WorksGallery.tsx`, 'WORK_ITEMS');
  const allItems = await readArray(`${SITE}/works-cad9886f/WorksPageContent.tsx`, 'WORK_ITEMS');

  // The homepage set is a subset of the /works/ set, but the two arrays use
  // different page-key directories for the same file. Match on basename.
  const base = (p) => (p ? p.split('/').pop() : '');
  const homeBasenames = new Set(homeItems.map((i) => base(i.src)));

  const workItems = allItems.map((item, index) => ({
    title: base(item.src).replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim(),
    file: base(item.src),
    localPath: item.src,
    alt: item.alt ?? '',
    categories: item.categories ?? [],
    showOnHome: homeBasenames.has(base(item.src)),
    order: index,
  }));

  // --- case studies -----------------------------------------------------
  const homeCases = await readArray(
    `${SITE}/shared/CaseStudySection.tsx`, 'CASE_STUDIES', { IMAGE_BASE: IMAGES.root },
  );
  const worksCases = await readArray(
    'src/app/works/page.tsx', 'WORKS_CASE_STUDIES', { IMAGE_BASE: IMAGES.root, WORKS_IMAGES: IMAGES.works },
  );
  const splitMeta = (meta) => {
    const i = meta.indexOf(' / ');
    return i === -1
      ? { industry: meta, services: '' }
      : { industry: meta.slice(0, i), services: meta.slice(i + 3) };
  };
  const homeClients = new Set(homeCases.map((c) => c.client));
  const caseStudies = worksCases.map((c, index) => ({
    client: c.client,
    ...splitMeta(c.meta),
    href: c.href,
    file: base(c.image.src),
    localPath: c.image.src,
    alt: c.image.alt ?? '',
    width: c.image.width,
    height: c.image.height,
    showOnHome: homeClients.has(c.client),
    order: index,
  }));

  // --- services ---------------------------------------------------------
  const homeServices = await readArray(
    `${SITE}/root-8a5edab2/ServiceCard.tsx`, 'SERVICE_CARDS', { IMAGE_BASE: IMAGES.root },
  );
  const pageServices = await readArray(
    `${SITE}/services-eeda784a/ServicesPageContent.tsx`, 'SERVICE_CARDS',
    { CARD_IMAGES: IMAGES.root, PAGE_IMAGES: '/sites/designally-co-e422ade5/services-eeda784a/images' },
  );

  const services = [
    ...homeServices.map((s, index) => ({
      page: 'home',
      eyebrow: s.eyebrow,
      title: Array.isArray(s.title) ? s.title.join('') : s.title,
      italicLetter: Array.isArray(s.title) && s.title[1] ? s.title[0].length : null,
      description: s.description,
      tags: s.tags ?? [],
      anchorId: s.anchorId ?? null,
      file: base(s.image.src),
      localPath: s.image.src,
      alt: s.image.alt ?? '',
      order: index,
    })),
    // The /services/ cards model their title as an ItalicTitle tuple
    // [before, italicLetter, after] and carry `image` as a bare path string,
    // unlike the homepage cards' `image: { src, alt }` object.
    ...pageServices.map((s, index) => {
      const [before = '', italic = '', after = ''] = Array.isArray(s.title)
        ? s.title
        : [s.title, '', ''];
      return {
        page: 'services',
        eyebrow: s.eyebrow,
        title: `${before}${italic}${after}`,
        italicLetter: italic ? before.length : null,
        description: s.description,
        tags: [],
        anchorId: null,
        file: base(s.image),
        localPath: s.image,
        alt: '',
        order: index,
      };
    }),
  ];

  // --- posts ------------------------------------------------------------
  const rawPosts = await readArray(
    `${SITE}/thoughts-e2a689e8/ThoughtsPage.tsx`, 'THOUGHT_POSTS', { IMAGE_BASE: IMAGES.thoughts },
  );
  const posts = rawPosts.map((p, index) => ({
    title: p.title,
    href: p.href,
    categories: p.categories,
    date: p.date,
    file: base(p.src),
    localPath: p.src,
    alt: p.alt ?? '',
    width: p.width,
    height: p.height,
    order: index,
  }));

  const seed = { workItems, caseStudies, services, posts };
  await mkdir(join(ROOT, 'sanity'), { recursive: true });
  await writeFile(join(ROOT, 'sanity/seed-data.json'), JSON.stringify(seed, null, 2) + '\n');

  console.log('sanity/seed-data.json written');
  console.log(`  workItems   ${workItems.length}  (${workItems.filter((i) => i.showOnHome).length} on the homepage)`);
  console.log(`  caseStudies ${caseStudies.length}  (${caseStudies.filter((c) => c.showOnHome).length} on the homepage)`);
  console.log(`  services    ${services.length}  (${services.filter((s) => s.page === 'home').length} home / ${services.filter((s) => s.page === 'services').length} services)`);
  console.log(`  posts       ${posts.length}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
