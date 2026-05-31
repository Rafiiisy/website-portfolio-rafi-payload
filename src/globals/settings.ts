import { editors } from "@/access/editors";

import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  access: {
    read: () => true,
    update: editors,
  },
  admin: {
    group: "General",
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Rafi Syafrinaldi",
    },
    {
      name: "defaultMeta",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
  ],
};
