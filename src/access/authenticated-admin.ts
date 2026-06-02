import type { PayloadRequest } from "payload";

/** Logged-in Payload admin user (`users` auth collection). */
export function isAdminPanelUser(req: PayloadRequest): boolean {
  return Boolean(
    req.user &&
      typeof req.user === "object" &&
      "collection" in req.user &&
      req.user.collection === "users",
  );
}
