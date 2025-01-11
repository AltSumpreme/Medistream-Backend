import { Role } from "@prisma/client";
import type { Context } from "hono";

export const checkRole = (role: Role[], ctx: Context) => {
  if (!role.includes(ctx.get("jwtPayload").role)) {
    return false;
  }

  return true;
};

export const getCurrentUser = (ctx: Context) => {
  return ctx.get("jwtPayload");
};
