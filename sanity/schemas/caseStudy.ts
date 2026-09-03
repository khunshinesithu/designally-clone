import { defineField, defineType } from "sanity";

/**
 * A case study: both the card (homepage + /works/) and the detail page at
 * /works/<slug>/.
 *
 * The homepage shows four cards and /works/ shows six, so both read this one
 * collection and `showOnHome` picks the subset. Everything from `slug` down
 * drives the detail page.
 */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      description: 'First half of the meta line — e.g. "Industrial & Manufacturing".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      description: 'Second half of the meta line — e.g. "Branding / Website".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Project URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Cover image",
      description: "Rendered at a 16:9 crop.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The detail page URL: /works/<slug>/.",
      type: "slug",
      options: { source: "client", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Headline",
      description: "The big EB Garamond heading on the detail page.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero video",
      description:
        "YouTube link. Plays muted and looping as the full-width band at the top of the detail page.",
      type: "url",
    }),
    defineField({
      name: "body",
      title: "Body",
      description: "Intro paragraphs, in order.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "visitLabel",
      title: "Visit link label",
      description: 'e.g. "Visit Skytower website". Leave empty to hide the link.',
      type: "string",
    }),
    defineField({
      name: "visitHref",
      title: "Visit link URL",
      type: "url",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      description: 'Fourth row of the About Project block — e.g. "3-4 Months".',
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "What we did",
      description: "Rendered as outlined pills.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      description:
        "Full-bleed blocks, in order. A row of one image spans the full width; " +
        "two or more lay out in a square two-column grid.",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryRow",
          title: "Image row",
          fields: [
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true }, fields: [
                defineField({ name: "alt", title: "Alt text", type: "string" }),
              ] }],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: { images: "images" },
            prepare: ({ images }) => ({
              title: `Image row (${images?.length ?? 0})`,
              media: images?.[0],
            }),
          },
        },
        {
          type: "object",
          name: "galleryVideo",
          title: "Video",
          fields: [
            defineField({
              name: "file",
              title: "Video file",
              description: "Plays muted on loop, full width.",
              type: "file",
              options: { accept: "video/*" },
            }),
            defineField({ name: "width", title: "Intrinsic width", type: "number" }),
            defineField({ name: "height", title: "Intrinsic height", type: "number" }),
          ],
          preview: {
            select: { w: "width", h: "height" },
            prepare: ({ w, h }) => ({ title: "Video", subtitle: w && h ? `${w}x${h}` : "" }),
          },
        },
      ],
    }),
    defineField({
      name: "nextUp",
      title: "Next up",
      description: "The project linked at the foot of this one's detail page.",
      type: "reference",
      to: [{ type: "caseStudy" }],
    }),
    defineField({
      name: "nextUpImage",
      title: "Next up banner",
      description:
        "The 3:1 banner shown above the Next up link. Held here rather than on the " +
        "linked project because the original does not always use that project's own banner.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "showOnHome",
      title: "Show on the homepage",
      description: "The homepage shows four; /works/ shows all of them.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "client", subtitle: "industry", media: "image" },
  },
});
