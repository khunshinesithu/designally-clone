import { defineField, defineType } from "sanity";

/** A listing entry on /thoughts/. */
export const post = defineType({
  name: "post",
  title: "Thought",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Article URL",
      description:
        "Full link to the article. Individual posts are not part of this site, so this points at designally.co.",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description:
        'Rendered verbatim as one line, comma-separated — e.g. "Knowledge, Tips".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      description:
        'A STRING, not a date picker — the original renders Thai dates such as "กรกฎาคม 17, 2024". Storing a real date would force a locale conversion and change what readers see. Type it exactly as it should appear.',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Thumbnail",
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
      description: "Lower numbers appear first.",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: "Listing order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});
