import { sectionIdFields } from "@/fields/section-id";

import type { Block } from "payload";

export const blockPortfolioTestimonialsConfig: Block = {
  slug: "block-portfolio-testimonials",
  labels: { singular: "Testimonials", plural: "Testimonials" },
  fields: [
    ...sectionIdFields(),
    { name: "title", type: "text", required: true },
    { name: "titleAccent", type: "text", required: true },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
      ],
    },
  ],
};
