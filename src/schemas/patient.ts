import { z } from "@hono/zod-openapi";
import { appointmentSchema } from "./appointment.js";
import { userSchema } from "./user.js";
import { medicalRecordSchema } from "./medicalRecord.js";
export const patientSchema: z.ZodType<{
  id: string;
  birthDate: Date;
  user: z.infer<typeof userSchema>[];
  medicalRecords: z.infer<typeof medicalRecordSchema>[];
  appointments: z.infer<typeof appointmentSchema>[];
}> = z.object({
  id: z.string().cuid().openapi({ example: "cm5mccbjk00002063ebefgxjp" }),
  birthDate: z.date().openapi({ example: "2021-09-01" }),
  user: z.array(userSchema),
  medicalRecords: z.array(medicalRecordSchema),
  appointments: z.array(appointmentSchema),
});
