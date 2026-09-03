#!/usr/bin/env node
/**
 * Recon: pull the six project case-study pages apart into structured JSON.
 *
 * Reads the saved HTML in the directory given as --in (default ./.case-study-html)
 * and writes docs/research/.../case-studies.json.
 *
 * The pages are one Elementor `single-post` template with four top-level
 * sections: hero (full-bleed background video or image), intro (two columns),
 * gallery (full-bleed, 1-up and 2-up rows) and "Next up".
 *
 * Images are lazy-loaded, so the real URL lives in `data-src`, not `src` —
 * `src` is a 1x1 transparent GIF on every one of them.
 */
import { JSDOM } from 'jsdom';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';

const args = process.argv.slice(2);
const argOf = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const IN_DIR = argOf('--in', '.case-study-html');
const OUT = argOf('--out', 'docs/research/designally-co-e422ade5/works-cad9886f/case-studies.json');

const txt = (el) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
/** Lazy-loaded images keep the real URL in data-src. */
const imgUrl = (img) => img.getAttribute('data-src') || img.getAttribute('src') || '';

function extract(html, slug) {
  const doc = new JSDOM(html).window.document;
  const root = doc.querySelector('[data-elementor-type="single-post"]');
  if (!root) throw new Error(`${slug}: no single-post wrapper`);
  const [hero, intro, gallery, nextUp] = [...root.children];

  // --- hero: Elementor stores the background choice in data-settings ---------
  let settings = {};
  try { settings = JSON.parse(hero.getAttribute('data-settings') || '{}'); } catch {}
  const heroImg = hero.querySelector('img');
  const heroBlock = {
    kind: settings.background_background === 'video' ? 'video' : heroImg ? 'image' : 'unknown',
    videoUrl: settings.background_video_link ?? null,
    imageUrl: heroImg ? imgUrl(heroImg) : null,
  };

  // --- intro: left column is prose, right column is the meta list -----------
  const headings = [...intro.querySelectorAll('h1,h2,h3')].map(txt);
  const metaFor = (label) => {
    const i = headings.indexOf(label);
    return i >= 0 ? headings[i + 1] ?? null : null;
  };
  const visitLink = [...intro.querySelectorAll('a')]
    .find((a) => /^visit/i.test(txt(a)));

  // "What We Did" tags are the anchors after that heading; the meta values
  // above them are plain h3s, so anchors alone identify the tags.
  const tags = [...intro.querySelectorAll('a')]
    .filter((a) => a !== visitLink && txt(a) && !/^visit/i.test(txt(a)))
    .map(txt);

  // --- gallery --------------------------------------------------------------
  // An ordered run of WordPress block galleries and standalone videos. Every
  // figure carries `columns-2`, so one image fills the row full-bleed (1425px
  // measured) and two or more lay out as a 713px two-column grid.
  //
  // Each lazy-loaded <img> has a <noscript> twin holding the same picture for
  // non-JS clients. Counting both doubles every gallery, so they are dropped.
  const blocks = [];
  const seen = new Set();
  const isReal = (el) => !el.closest('noscript');
  for (const node of gallery.querySelectorAll('figure.wp-block-gallery, video')) {
    if (!isReal(node) || seen.has(node)) continue;
    if (node.tagName === 'VIDEO') {
      if (node.closest('figure.wp-block-gallery')) continue;
      // Videos lazy-load exactly like the images: the file is in data-src.
      // They are decorative loops — autoplay, muted, no controls.
      blocks.push({
        kind: 'video',
        url:
          node.getAttribute('data-src') ||
          node.querySelector('source')?.getAttribute('data-src') ||
          node.querySelector('source')?.getAttribute('src') ||
          node.getAttribute('src') ||
          '',
        width: Number(node.getAttribute('width')) || null,
        height: Number(node.getAttribute('height')) || null,
        poster: node.getAttribute('poster') || null,
      });
      continue;
    }
    // Nested galleries would be visited twice; mark the whole subtree.
    node.querySelectorAll('figure.wp-block-gallery').forEach((f) => seen.add(f));
    const imgs = [...node.querySelectorAll('img')].filter(isReal);
    blocks.push({
      kind: 'gallery',
      columns: imgs.length === 1 ? 1 : 2,
      images: imgs.map((i) => ({
        url: imgUrl(i),
        alt: i.getAttribute('alt') || '',
        // WordPress emits the real intrinsic size on every image, so the seed
        // does not need to open the files to learn their dimensions.
        width: Number(i.getAttribute('width')) || null,
        height: Number(i.getAttribute('height')) || null,
      })),
    });
  }

  // --- next up --------------------------------------------------------------
  // Several anchors here point back at the current page on the live site; the
  // real destination is the only href that is not this page.
  const self = `/works/${slug}/`;
  const nextHref = [...nextUp.querySelectorAll('a')]
    .map((a) => a.getAttribute('href') || '')
    .find((h) => h.includes('/works/') && !h.endsWith(self));
  const nextImg = nextUp.querySelector('img');

  return {
    slug,
    title: txt(doc.querySelector('h1')),
    client: txt(intro.querySelector('h2')),
    metaTitle: (doc.title || '').replace(' | DESIGNALLY', ''),
    metaDescription: doc.querySelector('meta[name="description"]')?.content ?? null,
    hero: heroBlock,
    body: [...intro.querySelectorAll('p')].map(txt).filter(Boolean),
    visit: visitLink ? { label: txt(visitLink), href: visitLink.getAttribute('href') } : null,
    meta: {
      client: metaFor('CLIENT'),
      industry: metaFor('INDUSTRY'),
      service: metaFor('SERVICE'),
      duration: metaFor('DURATION'),
    },
    tags,
    gallery: blocks,
    nextUp: {
      label: txt(nextUp.querySelector('h2')),
      client: [...nextUp.querySelectorAll('h2')].map(txt).at(-1) ?? null,
      href: nextHref ?? null,
      imageUrl: nextImg ? imgUrl(nextImg) : null,
      width: nextImg ? Number(nextImg.getAttribute('width')) || null : null,
      height: nextImg ? Number(nextImg.getAttribute('height')) || null : null,
    },
  };
}

const files = (await readdir(IN_DIR)).filter((f) => f.endsWith('.html'));
const out = [];
for (const f of files.sort()) {
  const slug = basename(f, '.html');
  out.push(extract(await readFile(join(IN_DIR, f), 'utf8'), slug));
}

/**
 * Resolve each "Next up" link to a canonical slug.
 *
 * WordPress serves every case study under two URLs: the canonical one (which
 * matches the cards on /works/) and an alias that is the page's own H1
 * slugified. The "Next up" block links to the alias, so following it naively
 * would 404 inside the clone. Matching on the slugified title maps them back.
 */
const slugify = (t) =>
  t.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const byTitle = new Map(out.map((p) => [slugify(p.title), p.slug]));
for (const p of out) {
  const tail = (p.nextUp.href ?? '').replace(/\/$/, '').split('/').pop() ?? '';
  p.nextUp.slug = byTitle.get(tail) ?? (out.some((o) => o.slug === tail) ? tail : null);
  if (!p.nextUp.slug) console.warn(`  ! ${p.slug}: could not resolve next-up "${tail}"`);
}
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');

for (const p of out) {
  const media = p.gallery.reduce((n, b) => n + (b.kind === 'video' ? 1 : b.images.length), 0);
  console.log(
    `${p.slug.padEnd(42)} hero=${p.hero.kind.padEnd(5)} body=${String(p.body.length).padStart(2)}p ` +
    `tags=${String(p.tags.length).padStart(2)} blocks=${String(p.gallery.length).padStart(2)} media=${String(media).padStart(2)} ` +
    `next=${p.nextUp.slug ?? 'UNRESOLVED'}`,
  );
}
console.log(`\nWrote ${OUT}`);
