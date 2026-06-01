import { admins } from "@/access/admins";
import { editors } from "@/access/editors";
import { hasAdminRole, hasEditorRole, resolveUserRoles } from "@/access/resolve-user-roles";

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
    update: async ({ req }) => hasAdminRole(await resolveUserRoles(req)),
    delete: admins,
    admin: async ({ req }) => hasEditorRole(await resolveUserRoles(req)),
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
