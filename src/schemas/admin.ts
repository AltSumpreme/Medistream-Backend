import { z } from "@hono/zod-openapi";
import { userSchema } from "./user.js";

export const adminSchema = z.object({
  id: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  joinedAt: z.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
  updatedAt: z.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
  user: userSchema,
});
