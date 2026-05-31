import type { Access, FieldAccess } from "payload";

const hasEditorRole = (user: unknown) => {
  if (!user || typeof user !== "object" || !("roles" in user)) return false;
  const roles = (user as { roles?: unknown }).roles;
  return Array.isArray(roles) && (roles.includes("admin") || roles.includes("editor"));
};

export const editors: Access = ({ req }) => hasEditorRole(req.user);

export const editorsField: FieldAccess = ({ req }) => hasEditorRole(req.user);
