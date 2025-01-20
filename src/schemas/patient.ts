import { z } from "@hono/zod-openapi";

export const patientSchema = z.object({
  id: z.string().cuid().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  birthDate: z.date(),
  medicalHistory: z.string().optional(),
});
