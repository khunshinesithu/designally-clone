import { defineField, defineType } from "sanity";

/**
 * A case-study card. The homepage shows four of these and /works/ shows six,
 * so both pages read the same collection and `showOnHome` picks the subset.
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
