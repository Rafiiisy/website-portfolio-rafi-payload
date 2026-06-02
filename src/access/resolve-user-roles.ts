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

function userIdFromReq(req: PayloadRequest): string | null {
  if (!req.user || typeof req.user !== "object" || !("id" in req.user)) {
    return null;
  }

  return String((req.user as { id: unknown }).id);
}

function userEmailFromReq(req: PayloadRequest): string | null {
  if (!req.user || typeof req.user !== "object" || !("email" in req.user)) {
    return null;
  }

  const email = (req.user as { email?: unknown }).email;
  return typeof email === "string" && email.length > 0 ? email : null;
}

async function loadUserDoc(req: PayloadRequest): Promise<unknown | null> {
  const id = userIdFromReq(req);
  const email = userEmailFromReq(req);

  if (id) {
    try {
      return await req.payload.findByID({
        collection: "users",
        id,
        depth: 0,
        overrideAccess: true,
      });
    } catch {
      // fall through to email lookup
    }
  }

  if (email) {
    const result = await req.payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
      pagination: false,
    });

    return result.docs[0] ?? null;
  }

  return null;
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

  const doc = await loadUserDoc(req);
  return rolesFromUser(doc);
}

export function hasAdminRole(roles: string[] | null): boolean {
  return Boolean(roles?.includes("admin"));
}

export function hasEditorRole(roles: string[] | null): boolean {
  return Boolean(roles && (roles.includes("admin") || roles.includes("editor")));
}
