import { linkFields } from "@/fields/portfolio-shared";
import { sectionIdFields } from "@/fields/section-id";

import type { Block } from "payload";

export const blockPortfolioContactConfig: Block = {
  slug: "block-portfolio-contact",
  labels: { singular: "Contact", plural: "Contact" },
  fields: [
    ...sectionIdFields(),
    { name: "badge", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "titleAccent", type: "text", required: true },
    { name: "subtitle", type: "textarea", required: true },
    { name: "cta", type: "text", required: true },
    { name: "ctaHref", type: "text", required: true },
    { name: "copyright", type: "text", required: true },
    {
      name: "links",
      type: "array",
      required: true,
      fields: linkFields(),
    },
  ],
};
