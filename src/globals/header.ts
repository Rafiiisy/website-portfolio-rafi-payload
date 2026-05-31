import { editors } from "@/access/editors";

import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
    update: editors,
  },
  admin: {
    group: "General",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "shortName", type: "text", required: true },
    {
      name: "nav",
      type: "array",
      required: true,
      fields: [
        {
          name: "sectionId",
          type: "text",
          required: true,
          admin: { description: "DOM id to scroll to, e.g. projects" },
        },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};
