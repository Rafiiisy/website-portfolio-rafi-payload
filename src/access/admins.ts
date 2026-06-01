import { hasAdminRole, resolveUserRoles } from "@/access/resolve-user-roles";

import type { Access } from "payload";

export const admins: Access = async ({ req }) => hasAdminRole(await resolveUserRoles(req));
