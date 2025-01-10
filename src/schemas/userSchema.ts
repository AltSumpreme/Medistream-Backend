import { z } from "@hono/zod-openapi";

export const userSchema = z.object({
  id: z.string().cuid().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  FirstName: z.string().openapi({ example: "John" }),
  LastName: z.string().openapi({ example: "Doe" }),
  MiddleName: z.string().optional().openapi({ example: "Smith" }),
  phone: z.string().optional().openapi({ example: "1234567890" }),
  role: z.string().optional().openapi({ example: "admin" }),
  createdAt: z.date().openapi({ example: "2022-01-01T00:00:00.000Z" }),
  updatedAt: z.date().openapi({ example: "2022-01-01T00:00:00.000Z" }),
});
