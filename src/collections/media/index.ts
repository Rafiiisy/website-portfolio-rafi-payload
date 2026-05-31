import { anyone } from "@/access/anyone";
import { editors } from "@/access/editors";

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: editors,
    read: anyone,
    update: editors,
    delete: editors,
  },
  admin: {
    defaultColumns: ["filename", "alt", "createdAt", "updatedAt"],
    useAsTitle: "alt",
  },
  upload: {
    staticDir: "uploads/media",
    // One file per upload; layout CSS controls display size (no thumbnail/large variants).
    mimeTypes: ["image/*", "video/mp4"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
