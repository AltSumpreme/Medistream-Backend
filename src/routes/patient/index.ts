import { OpenAPIHono } from "@hono/zod-openapi";
import prisma from "../../lib/prisma-client.js";
import { getPatient } from "./route.js";
import { getPatientById } from "./route.js";
import { deletePatient } from "./route.js";
import { updatePatient } from "./route.js";
import { Role } from "@prisma/client";
import { checkRole, getCurrentUser } from "../../lib/auth-provider.js";

const patientRouter = new OpenAPIHono();

patientRouter.openapi(getPatient, async (ctx) => {
  try {
    const allowedRoles: Role[] = ["ADMIN"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json({ message: "Unauthorized access to the " }, 403);
    }
    const patient = await prisma.patient.findMany();
    if (!patient) {
      return ctx.json({ message: "Patient not found" }, 404);
    }
    return ctx.json(patient, 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

patientRouter.openapi(getPatientById, async (ctx) => {
  try {
    const user = getCurrentUser(ctx);
    if (!user) {
      return ctx.json({ message: "Unauthorized access" }, 403);
    }
    const allowedRoles: Role[] = ["ADMIN", "DOCTOR", "PATIENT"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json({ message: "Unauthorized access " }, 403);
    }
    const userid = ctx.req.param("id");
    const patient = await prisma.patient.findUnique({
      where: {
        id: userid,
      },
    });
    if (!patient) {
      return ctx.json({ message: "Patient not found" }, 404);
    }
    if (user.role === "PATIENT" && userid !== patient.id) {
      return ctx.json({ message: "Unauthorized access" }, 403);
    }
    return ctx.json(patient, 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});
patientRouter.openapi(updatePatient, async (ctx) => {
  try {
    const user = getCurrentUser(ctx);
    if (!user) {
      return ctx.json({ message: "Unauthorized access" }, 403);
    }
    const allowedRoles: Role[] = ["ADMIN"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json({ message: "Unauthorized access" }, 403);
    }
    const userid = ctx.req.param("id");
    const patient = await prisma.patient.findUnique({
      where: {
        id: userid,
      },
    });

    const { Name, phone } = ctx.req.valid("json");
    if (!patient) {
      return ctx.json({ message: "Patient not found" }, 404);
    }
    if (user.role === "PATIENT" && userid !== patient.id) {
      return ctx.json({ message: "Unauthorized access" }, 403);
    }

    await prisma.doctor.update({
      where: {
        id: userid,
      },
      data: {
        user: {
          update: {
            Name: Name,
            phone: phone,
          },
        },
      },
    });
    return ctx.json("Patient details have been successfully updated", 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});
patientRouter.openapi(deletePatient, async (ctx) => {
  try {
    const user = getCurrentUser(ctx);
    if (!user) {
      return ctx.json({ message: "Unauthorized access" }, 403);
    }
    const allowedRoles: Role[] = ["ADMIN"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json({ message: "Unauthorized access " }, 403);
    }
    const userid = ctx.req.param("id");
    const patient = await prisma.patient.delete({
      where: {
        id: userid,
      },
    });
    if (!patient) {
      return ctx.json({ message: "Patient not found" }, 404);
    }
    return ctx.json("Patient record successfully deleted", 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});
