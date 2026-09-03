#!/usr/bin/env node
/**
 * Recon: pull the two designally.co legal pages into structured JSON.
 *
 *   node scripts/extract-legal.mjs --in <dir of saved html>
 *
 * These are plain documents — one Elementor section of headings, paragraphs and
 * nested bullet lists, no images. The content is Thai and rarely changes, so it
 * ships as data in the repository rather than going into the CMS.
 */
import { JSDOM } from 'jsdom';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';

const args = process.argv.slice(2);
const argOf = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const IN_DIR = argOf('--in', '.legal-html');
const OUT = argOf('--out', 'src/content/legal-pages.json');

const txt = (el) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

/** A <ul> becomes { items: [...] }, where an item may carry a nested list. */
function listOf(ul) {
  return [...ul.children]
    .filter((li) => li.tagName === 'LI')
    .map((li) => {
      const nested = li.querySelector(':scope > ul');
      const clone = li.cloneNode(true);
      clone.querySelectorAll(':scope > ul').forEach((n) => n.remove());
      return { text: txt(clone), items: nested ? listOf(nested) : undefined };
    })
    .filter((i) => i.text || i.items?.length);
}

function extract(html, slug) {
  const doc = new JSDOM(html).window.document;
  const root = doc.querySelector('[data-elementor-type="wp-page"]');
  if (!root) throw new Error(`${slug}: no wp-page wrapper`);

  const blocks = [];
  const seen = new Set();
  for (const node of root.querySelectorAll(
    '.elementor-widget-container > h1, .elementor-widget-container > h2, ' +
      '.elementor-widget-container > h3, .elementor-widget-container > p, ' +
      '.elementor-widget-container > ul',
  )) {
    if (seen.has(node)) continue;
    if (node.tagName === 'UL') {
      node.querySelectorAll('ul').forEach((n) => seen.add(n));
      const items = listOf(node);
      if (items.length) blocks.push({ kind: 'list', items });
      continue;
    }
    const text = txt(node);
    // Nine headings and paragraphs hold only &nbsp;. They are deliberate
    // vertical spacing in the source document and carry real height — dropping
    // them makes the page 397px shorter than the original — so they are kept as
    // spacers rather than discarded.
    if (!text) {
      blocks.push({ kind: 'spacer', of: node.tagName.toLowerCase() });
      continue;
    }
    blocks.push({ kind: node.tagName.toLowerCase(), text });
  }

  return {
    slug,
    title: txt(root.querySelector('h1')),
    metaTitle: (doc.title || '').replace(' | DESIGNALLY', ''),
    metaDescription: doc.querySelector('meta[name="description"]')?.content ?? null,
    blocks,
  };
}

const files = (await readdir(IN_DIR)).filter((f) => f.endsWith('.html'));
const out = [];
for (const f of files.sort()) out.push(extract(await readFile(join(IN_DIR, f), 'utf8'), basename(f, '.html')));

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');

for (const p of out) {
  const counts = p.blocks.reduce((a, b) => { a[b.kind] = (a[b.kind] ?? 0) + 1; return a; }, {});
  const chars = p.blocks.reduce((n, b) => n + (b.text?.length ?? 0), 0);
  console.log(`${p.slug.padEnd(16)} ${JSON.stringify(counts).padEnd(44)} chars=${chars}`);
}
console.log(`\nWrote ${OUT}`);
