// prescriptionSchema.ts
import { z } from "@hono/zod-openapi";
import { patientSchema } from "./patientSchema.js";
import { doctorSchema } from "./doctorSchema.js";
export const prescriptionSchema = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  medication: z.string().openapi({ example: "Amoxicillin" }),
  dosage: z.string().openapi({ example: "500mg twice daily" }),
  issuedAt: z.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
  expiresAt: z.date().openapi({ example: "2024-02-01T00:00:00.000Z" }),
  patientId: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  doctorId: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  patient: patientSchema,
  doctor: doctorSchema,
});
