import { defineField, defineType } from "sanity";

/**
 * A tile in the works gallery.
 *
 * Before the CMS these lived as TWO hardcoded arrays — 56 items in the
 * homepage's `WorksGallery` and 74 in `/works/` — with the homepage set being a
 * subset of the other. Editing a category in one silently disagreed with the
 * other. Here there is a single collection and `showOnHome` decides which tiles
 * the homepage gallery renders.
 */
export const workItem = defineType({
  name: "workItem",
  title: "Work item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Internal label — used to find this item in the Studio. Not rendered.",
      type: "string",
      validation: (rule) => rule.required(),
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
      description:
        "Leave empty for a purely decorative tile. Most of the originals are empty because the image is the content.",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "A tile can belong to more than one — eight of the originals do.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Logo Design", value: "logo-design" },
          { title: "Packaging", value: "packaging" },
          { title: "Brand CI", value: "brand-ci" },
          { title: "Website", value: "website" },
          { title: "Social Media", value: "social-media" },
        ],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "showOnHome",
      title: "Show in the homepage gallery",
      description:
        "The homepage shows a subset of the full works gallery. Untick to keep a tile on /works/ only.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first. Gallery order is deliberate, not alphabetical.",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: "Gallery order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "categories" },
    prepare: ({ title, media, subtitle }) => ({
      title,
      media,
      subtitle: Array.isArray(subtitle) ? subtitle.join(", ") : undefined,
    }),
  },
});
