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
      name: "slug",
      title: "Slug",
      description: "The article URL: /thoughts/<slug>/.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "body",
      title: "Article",
      description: "The article itself. Images sit between paragraphs at full column width.",
      type: "array",
      of: [
        {
          type: "block",
          // The source articles only ever use these; offering more would invite
          // styles the page has no design for.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
        {
          type: "image",
          name: "contentImage",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "related",
      title: "Next up",
      description: "The article linked at the foot of this one.",
      type: "reference",
      to: [{ type: "post" }],
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
