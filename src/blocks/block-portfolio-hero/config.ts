import { linkFields } from "@/fields/portfolio-shared";
import { sectionIdFields } from "@/fields/section-id";

import type { Block } from "payload";

export const blockPortfolioHeroConfig: Block = {
  slug: "block-portfolio-hero",
  labels: { singular: "Hero", plural: "Hero" },
  fields: [
    ...sectionIdFields(),
    {
      name: "portrait",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    { name: "role", type: "text", required: true },
    { name: "location", type: "text", required: true },
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "tagline", type: "text", required: true },
    { name: "taglineSub", type: "text", required: true },
    { name: "connectLabel", type: "text", required: true },
    { name: "scrollLabel", type: "text", required: true },
    {
      name: "social",
      type: "array",
      required: true,
      fields: linkFields(),
    },
  ],
};
