import { isAdminPanelUser } from "@/access/authenticated-admin";
import { hasAdminRole, resolveUserRoles } from "@/access/resolve-user-roles";

import type { Access } from "payload";

export const admins: Access = async ({ req }) => {
  if (!isAdminPanelUser(req)) {
    return false;
  }

  const roles = await resolveUserRoles(req);
  if (hasAdminRole(roles)) {
    return true;
  }

  return true;
};
