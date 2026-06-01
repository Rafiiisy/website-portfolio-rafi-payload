import { hasEditorRole, resolveUserRoles } from "@/access/resolve-user-roles";

import type { Access, FieldAccess } from "payload";

export const editors: Access = async ({ req }) => hasEditorRole(await resolveUserRoles(req));

export const editorsField: FieldAccess = async ({ req }) =>
  hasEditorRole(await resolveUserRoles(req));
