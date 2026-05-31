import { blockPortfolioContactConfig } from "@/blocks/block-portfolio-contact/config";
import { blockPortfolioHeroConfig } from "@/blocks/block-portfolio-hero/config";
import { blockPortfolioProjectsConfig } from "@/blocks/block-portfolio-projects/config";
import { blockPortfolioStackConfig } from "@/blocks/block-portfolio-stack/config";
import { blockPortfolioTestimonialsConfig } from "@/blocks/block-portfolio-testimonials/config";
import { editors } from "@/access/editors";
import { editorsOrPublished } from "@/access/editors-or-published";

import type { CollectionConfig } from "payload";

const collectionSlug = "pages";

const normalizeSlug = (value: unknown) =>
  String(value || "")
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

export const Pages: CollectionConfig = {
  slug: collectionSlug,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "url", "_status", "publishedAt"],
  },
  access: {
    create: editors,
    read: editorsOrPublished,
    update: editors,
    delete: editors,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        const slug = normalizeSlug(data.slug);
        data.slug = slug;
        data.url = data.isHomepage ? "/" : `/${slug}`;
        return data;
      },
    ],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "url",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "isHomepage",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          async ({ previousValue, req, value }) => {
            if (value === true && previousValue !== value) {
              await req.payload.update({
                collection: collectionSlug,
                where: { isHomepage: { equals: true } },
                data: { isHomepage: false },
              });
            }

            return value;
          },
        ],
        beforeDuplicate: [() => false],
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "meta",
      type: "group",
      fields: [
        { name: "title", label: "Meta Title", type: "text" },
        { name: "description", label: "Meta Description", type: "textarea" },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      required: true,
      blocks: [
        blockPortfolioHeroConfig,
        blockPortfolioProjectsConfig,
        blockPortfolioStackConfig,
        blockPortfolioTestimonialsConfig,
        blockPortfolioContactConfig,
      ],
    },
  ],
};
