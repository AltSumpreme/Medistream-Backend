import { z } from "@hono/zod-openapi";
import { userSchema } from "./userSchema.js";

export const authSchema = z.object({
  id: z.string().cuid().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  email: z.string().email().openapi({ example: "johnsmith@gmail.com" }),
  password: z.string().openapi({ example: "password" }),
  createdAt: z.date().openapi({ example: "2022-01-01T00:00:00.000Z" }),
  updatedAt: z.date().openapi({ example: "2022-01-01T00:00:00.000Z" }),
  user: userSchema,
  Phone: z.string().optional().openapi({ example: "1234567890" }),
});
