import type { Access } from "payload";

export const admins: Access = ({ req }) => {
  const roles = req.user?.roles;
  return Array.isArray(roles) && roles.includes("admin");
};
