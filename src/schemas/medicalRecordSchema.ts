// medicalRecordSchema.ts
import { z } from "@hono/zod-openapi";
import { patientSchema } from "./patientSchema.js";
import { doctorSchema } from "./doctorSchema.js";

export const medicalRecordSchema = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  recordDate: z.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
  description: z.string().openapi({ example: "Regular checkup report" }),
  patientId: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  doctorId: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  patient: patientSchema,
  doctor: doctorSchema,
});
