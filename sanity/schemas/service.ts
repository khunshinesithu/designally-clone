import { defineField, defineType } from "sanity";

/**
 * A service card.
 *
 * The homepage and /services/ describe the same five services with DIFFERENT
 * copy, and the homepage version carries pill tags the /services/ one does not.
 * That is how the original reads, so each page gets its own document rather
 * than one shared record with a pile of conditional fields.
 */
export const service = defineType({
  name: "service",
  title: "Service card",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      description: "Which page this card belongs to. The two pages use different copy.",
      type: "string",
      options: {
        list: [
          { title: "Homepage", value: "home" },
          { title: "Services page", value: "services" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: 'Small label above the title — e.g. "BRANDING".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "italicLetter",
      title: "Italic letter",
      description:
        'The design sets one letter of each title in italic ("Brand C*o*re"). Give the zero-based index of that letter, or leave empty for none.',
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Pill tags. Homepage cards only — the /services/ cards have none.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "anchorId",
      title: "Anchor id",
      description:
        'Used by the sticky panel links on the homepage (#Branding, #Website, #DesignAlly). Leave empty if this card is not an anchor target.',
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
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
    select: { title: "title", subtitle: "page", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle === "home" ? "Homepage" : "Services page",
      media,
    }),
  },
});
