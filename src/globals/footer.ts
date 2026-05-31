import { editors } from "@/access/editors";

import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: editors,
  },
  admin: {
    group: "General",
  },
  fields: [{ name: "copyright", type: "text", required: true }],
};
