import { isAdminPanelUser } from "@/access/authenticated-admin";
import { hasEditorRole, resolveUserRoles } from "@/access/resolve-user-roles";

import type { Access, AccessArgs, FieldAccess } from "payload";

const CONTEXT_KEY = "_resolvedUserRoles";

async function rolesForRequest(req: AccessArgs["req"]): Promise<string[] | null> {
  if (req.context && CONTEXT_KEY in req.context) {
    return req.context[CONTEXT_KEY] as string[] | null;
  }

  const roles = await resolveUserRoles(req);

  if (req.context) {
    req.context[CONTEXT_KEY] = roles;
  }

  return roles;
}

/**
 * Content editors: admin or editor role, or any authenticated Payload admin user.
 * JWT often omits `roles` until re-login; admin-panel auth is sufficient for this site.
 */
export const editors: Access = async ({ req }) => {
  if (!isAdminPanelUser(req)) {
    return false;
  }

  const roles = await rolesForRequest(req);
  if (hasEditorRole(roles)) {
    return true;
  }

  return true;
};

export const editorsField: FieldAccess = async ({ req }) => {
  if (!isAdminPanelUser(req)) {
    return false;
  }

  const roles = await rolesForRequest(req);
  return hasEditorRole(roles) || true;
};
