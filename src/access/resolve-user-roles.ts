import type { PayloadRequest } from "payload";

function rolesFromUser(user: unknown): string[] | null {
  if (!user || typeof user !== "object" || !("roles" in user)) {
    return null;
  }

  const roles = (user as { roles?: unknown }).roles;
  if (!Array.isArray(roles)) {
    return null;
  }

  return roles.filter((role): role is string => typeof role === "string");
}

/** Roles from JWT/user doc, or fresh DB read when JWT omits roles (Payload local-jwt default). */
export async function resolveUserRoles(req: PayloadRequest): Promise<string[] | null> {
  if (!req.user) {
    return null;
  }

  const fromAuth = rolesFromUser(req.user);
  if (fromAuth && fromAuth.length > 0) {
    return fromAuth;
  }

  const id =
    typeof req.user === "object" && req.user && "id" in req.user
      ? String((req.user as { id: unknown }).id)
      : null;

  if (!id) {
    return null;
  }

  try {
    const doc = await req.payload.findByID({
      collection: "users",
      id,
      depth: 0,
      overrideAccess: true,
    });
    return rolesFromUser(doc);
  } catch {
    return null;
  }
}

export function hasAdminRole(roles: string[] | null): boolean {
  return Boolean(roles?.includes("admin"));
}

export function hasEditorRole(roles: string[] | null): boolean {
  return Boolean(roles && (roles.includes("admin") || roles.includes("editor")));
}
