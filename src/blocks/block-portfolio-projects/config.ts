import { comparisonSideFields } from "@/fields/portfolio-shared";
import { sectionIdFields } from "@/fields/section-id";

import type { Block } from "payload";

export const blockPortfolioProjectsConfig: Block = {
  slug: "block-portfolio-projects",
  labels: { singular: "Projects", plural: "Projects" },
  fields: [
    ...sectionIdFields(),
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "titleAccent", type: "text", required: true },
    { name: "subtitle", type: "textarea", required: true },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        { name: "number", type: "text", required: true, admin: { description: "e.g. 01" } },
        { name: "category", type: "text", required: true },
        { name: "metrics", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "tags",
          type: "array",
          required: true,
          fields: [{ name: "label", type: "text", required: true }],
        },
        comparisonSideFields("before", "Before"),
        comparisonSideFields("after", "After"),
      ],
    },
  ],
};
