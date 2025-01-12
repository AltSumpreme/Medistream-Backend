// doctorSchema.ts
import { z } from "@hono/zod-openapi";
import { userSchema } from "./userSchema.js";
export const doctorSchema = z.object({
  id: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  licenseNumber: z.string().openapi({ example: "MD123456" }),
  specialization: z.string().openapi({ example: "Cardiology" }),
  yearsOfExperience: z.number().int().positive().openapi({ example: 10 }),
  user: userSchema,
});
