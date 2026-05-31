import { admins } from "@/access/admins";
import { editors } from "@/access/editors";

import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "roles", "createdAt", "updatedAt"],
  },
  auth: true,
  access: {
    create: admins,
    read: editors,
    update: ({ req }) => {
      const roles = req.user?.roles;
      return Array.isArray(roles) && roles.includes("admin");
    },
    delete: admins,
    admin: ({ req }) => {
      const roles = req.user?.roles;
      return Array.isArray(roles) && (roles.includes("admin") || roles.includes("editor"));
    },
  },
  fields: [
    {
      name: "roles",
      type: "select",
      required: true,
      hasMany: true,
      defaultValue: ["admin"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
