import { z } from "@hono/zod-openapi";

export const appointmentSchema = z.object({
  id: z.string().cuid().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  date: z.date().openapi({ example: "2022-01-01T00:00:00.000Z" }),
  status: z.string().openapi({ example: "pending" }),
  description: z.string().openapi({ example: "Dental cleaning" }),
});
