#!/usr/bin/env node
/**
 * Recon: pull the nine designally.co blog posts apart into structured JSON.
 *
 *   node scripts/extract-posts.mjs --in <dir of saved html>
 *
 * All nine are one Elementor `single-post` template with four sections:
 * masthead (display:none on desktop), featured image, article body, related.
 *
 * The article body becomes Portable Text so the Studio gets a real rich-text
 * editor. The markup is bounded — h1-h4, p, ul/ol, figure, strong, a, br — so a
 * purpose-built converter covers it without pulling in @portabletext/block-tools.
 */
import { JSDOM } from 'jsdom';
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';

const args = process.argv.slice(2);
const argOf = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const IN_DIR = argOf('--in', '.post-html');
const OUT = argOf('--out', 'docs/research/designally-co-e422ade5/thoughts-e2a689e8/posts.json');

const txt = (el) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
const imgUrl = (img) => img.getAttribute('data-src') || img.getAttribute('src') || '';
const isReal = (el) => !el.closest('noscript');

/**
 * Images the post hotlinks from somewhere other than designally.co.
 *
 * One post embeds nine Facebook CDN images whose signed URLs expired in August
 * 2024 (`oe=66AE...`). They return 403 and are broken on the live site today —
 * verified by loading one from designally.co's own origin. Reproducing a broken
 * image is worse than omitting it, so they are dropped and reported.
 */
const offsite = [];

let keySeq = 0;
const key = () => `k${(keySeq++).toString(36)}`;

/**
 * One text node run -> Portable Text spans, carrying `strong` marks and links.
 * Links become markDefs; everything else degrades to plain text.
 */
function spansOf(el) {
  const spans = [];
  const markDefs = [];
  const walk = (node, marks) => {
    for (const child of node.childNodes) {
      if (child.nodeType === 3) {
        const text = child.textContent.replace(/\s+/g, ' ');
        if (text) spans.push({ _type: 'span', _key: key(), text, marks: [...marks] });
      } else if (child.nodeType === 1) {
        const tag = child.tagName;
        if (tag === 'BR') {
          spans.push({ _type: 'span', _key: key(), text: '\n', marks: [] });
        } else if (tag === 'STRONG' || tag === 'B') {
          walk(child, [...marks, 'strong']);
        } else if (tag === 'EM' || tag === 'I') {
          walk(child, [...marks, 'em']);
        } else if (tag === 'A') {
          const href = child.getAttribute('href');
          if (href) {
            const _key = key();
            markDefs.push({ _type: 'link', _key, href });
            walk(child, [...marks, _key]);
          } else walk(child, marks);
        } else {
          walk(child, marks);
        }
      }
    }
  };
  walk(el, []);
  return { spans, markDefs };
}

function block(el, style) {
  const { spans, markDefs } = spansOf(el);
  if (!spans.some((s) => s.text.trim())) return null;
  return { _type: 'block', _key: key(), style, markDefs, children: spans };
}

function listBlocks(listEl) {
  const listItem = listEl.tagName === 'OL' ? 'number' : 'bullet';
  return [...listEl.children]
    .filter((li) => li.tagName === 'LI')
    .map((li) => {
      const b = block(li, 'normal');
      return b && { ...b, listItem, level: 1 };
    })
    .filter(Boolean);
}

/** Convert one Elementor body section into Portable Text blocks + images. */
function toPortableText(section, { skipFirstH1 = true } = {}) {
  const out = [];
  let seenH1 = false;
  const HEADINGS = { H1: 'h1', H2: 'h2', H3: 'h3', H4: 'h4', H5: 'h5', H6: 'h6' };

  // Walk the rendered order. Widget containers are the unit Elementor renders
  // content into; anything outside one is chrome.
  const nodes = section.querySelectorAll(
    '.elementor-widget-container > h1, .elementor-widget-container > h2, ' +
      '.elementor-widget-container > h3, .elementor-widget-container > h4, ' +
      '.elementor-widget-container > p, .elementor-widget-container > ul, ' +
      '.elementor-widget-container > ol, .elementor-widget-container > div, ' +
      '.elementor-widget-container > figure, .elementor-widget-container img',
  );

  const seen = new Set();
  for (const node of nodes) {
    if (!isReal(node) || seen.has(node)) continue;

    if (node.tagName === 'IMG') {
      const u = imgUrl(node);
      if (!u.includes('designally.co')) { offsite.push(u); continue; }
      out.push({ _type: 'contentImage', _key: key(), url: u, alt: node.getAttribute('alt') || '',
        width: Number(node.getAttribute('width')) || null, height: Number(node.getAttribute('height')) || null });
      continue;
    }
    if (node.tagName === 'FIGURE') {
      node.querySelectorAll('img').forEach((i) => seen.add(i));
      for (const i of [...node.querySelectorAll('img')].filter(isReal)) {
        const u = imgUrl(i);
        if (!u.includes('designally.co')) { offsite.push(u); continue; }
        out.push({ _type: 'contentImage', _key: key(), url: u, alt: i.getAttribute('alt') || '',
          width: Number(i.getAttribute('width')) || null, height: Number(i.getAttribute('height')) || null });
      }
      continue;
    }
    if (HEADINGS[node.tagName]) {
      if (node.tagName === 'H1' && !seenH1) {
        seenH1 = true;
        // The body repeats the post title as an h1; the page renders it from
        // the title field, so it must not appear twice.
        if (skipFirstH1) continue;
      }
      const b = block(node, HEADINGS[node.tagName]);
      if (b) out.push(b);
      continue;
    }
    if (node.tagName === 'UL' || node.tagName === 'OL') {
      out.push(...listBlocks(node));
      continue;
    }
    // A <p> or wrapper <div>. Lists nested inside a <p> happen in this content,
    // so pull them out rather than flattening them into the paragraph.
    const nested = node.querySelectorAll(':scope > ul, :scope > ol');
    if (nested.length) {
      nested.forEach((n) => seen.add(n));
      const clone = node.cloneNode(true);
      clone.querySelectorAll('ul, ol').forEach((n) => n.remove());
      const b = block(clone, 'normal');
      if (b) out.push(b);
      for (const n of nested) out.push(...listBlocks(n));
      continue;
    }
    if (node.tagName === 'DIV') continue; // wrapper; its children are visited
    const b = block(node, 'normal');
    if (b) out.push(b);
  }
  return out;
}

function extract(html, slug) {
  const doc = new JSDOM(html).window.document;
  const root = doc.querySelector('[data-elementor-type="single-post"]');
  if (!root) throw new Error(`${slug}: no single-post wrapper`);
  const [masthead, featured, body, related] = [...root.children];

  const featImg = [...featured.querySelectorAll('img')].filter(isReal)[0];

  // The masthead is display:none on desktop but still carries the category and
  // date, which is where the listing takes them from.
  const mastheadText = txt(masthead);
  const [category, date] = mastheadText.split('/').map((s) => s.trim());

  const relLink = [...related.querySelectorAll('a')]
    .map((a) => a.getAttribute('href') || '')
    .find((h) => h.startsWith('https://designally.co/') && !h.includes('/thoughts'));
  const relImg = [...related.querySelectorAll('img')].filter(isReal)[0];
  const relTitle = [...related.querySelectorAll('h1')].map(txt).find((t) => t && !/^next$|^up$/i.test(t));

  return {
    slug,
    title: txt(doc.querySelector('h1')),
    metaTitle: (doc.title || '').replace(' | DESIGNALLY', ''),
    metaDescription: doc.querySelector('meta[name="description"]')?.content ?? null,
    category: category || null,
    date: (date || '').replace(/^.*?(\S+\s+\d+,\s*\d{4}).*$/, '$1') || null,
    featuredImage: featImg
      ? { url: imgUrl(featImg), alt: featImg.getAttribute('alt') || '',
          width: Number(featImg.getAttribute('width')) || null,
          height: Number(featImg.getAttribute('height')) || null }
      : null,
    body: toPortableText(body),
    related: relLink
      ? { href: relLink, title: relTitle ?? null,
          slug: relLink.replace(/\/$/, '').split('/').pop(),
          imageUrl: relImg ? imgUrl(relImg) : null,
          width: relImg ? Number(relImg.getAttribute('width')) || null : null,
          height: relImg ? Number(relImg.getAttribute('height')) || null : null }
      : null,
  };
}

const files = (await readdir(IN_DIR)).filter((f) => f.endsWith('.html'));
const out = [];
for (const f of files.sort()) out.push(extract(await readFile(join(IN_DIR, f), 'utf8'), basename(f, '.html')));

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');

for (const p of out) {
  const counts = p.body.reduce((a, b) => {
    const k = b._type === 'contentImage' ? 'img' : b.listItem ? 'li' : b.style;
    a[k] = (a[k] ?? 0) + 1; return a;
  }, {});
  console.log(
    `${p.slug.slice(0, 46).padEnd(48)} ${String(p.category).padEnd(10)} blocks=${String(p.body.length).padStart(3)} ` +
      `${JSON.stringify(counts).padEnd(46)} rel=${p.related?.slug?.slice(0, 24) ?? 'NONE'}`,
  );
}
if (offsite.length) {
  const hosts = [...new Set(offsite.map((u) => new URL(u).host.replace(/\d/g, '#')))];
  console.log(`\nDropped ${offsite.length} off-site images (${hosts.join(', ')}) — broken on the live site.`);
}
console.log(`\nWrote ${OUT}`);
