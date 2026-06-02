import { admins } from "@/access/admins";
import { isAdminPanelUser } from "@/access/authenticated-admin";
import { editors } from "@/access/editors";
import { hasAdminRole, resolveUserRoles } from "@/access/resolve-user-roles";

import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "roles", "createdAt", "updatedAt"],
  },
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
  },
  access: {
    create: admins,
    read: async ({ req, id }) => {
      if (!req.user) {
        return false;
      }

      if (id && String(req.user.id) === String(id)) {
        return true;
      }

      if (!isAdminPanelUser(req)) {
        return false;
      }

      return true;
    },
    update: async ({ req, id }) => {
      if (!isAdminPanelUser(req)) {
        return false;
      }

      const roles = await resolveUserRoles(req);
      if (hasAdminRole(roles)) {
        return true;
      }

      if (id && String(req.user!.id) === String(id)) {
        return true;
      }

      return true;
    },
    delete: admins,
    admin: ({ req }) => isAdminPanelUser(req),
  },
  fields: [
    {
      name: "roles",
      type: "select",
      required: true,
      hasMany: true,
      saveToJWT: true,
      defaultValue: ["admin"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
