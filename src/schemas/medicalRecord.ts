// medicalRecordSchema.ts
import { z } from "@hono/zod-openapi";
import { patientSchema } from "./patient.js";
import { doctorSchema } from "./doctor.js";

export const medicalRecordSchema = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  recordDate: z.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
  description: z.string().openapi({ example: "Regular checkup report" }),
  patientId: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  doctorId: z.string().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  patient: z.array(patientSchema),
  doctor: z.array(doctorSchema),
});
