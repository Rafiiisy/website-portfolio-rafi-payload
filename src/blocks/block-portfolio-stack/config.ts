import { skillIconOptions } from "@/fields/portfolio-shared";
import { sectionIdFields } from "@/fields/section-id";

import type { Block } from "payload";

export const blockPortfolioStackConfig: Block = {
  slug: "block-portfolio-stack",
  labels: { singular: "Stack", plural: "Stack" },
  fields: [
    ...sectionIdFields(),
    { name: "title", type: "text", required: true },
    { name: "titleAccent", type: "text", required: true },
    { name: "subtitle", type: "textarea", required: true },
    {
      name: "categories",
      type: "array",
      required: true,
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "icon",
          type: "select",
          required: true,
          options: skillIconOptions,
        },
        {
          name: "tags",
          type: "array",
          required: true,
          fields: [{ name: "label", type: "text", required: true }],
        },
      ],
    },
  ],
};
