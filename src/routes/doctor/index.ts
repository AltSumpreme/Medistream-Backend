import { OpenAPIHono } from "@hono/zod-openapi";
import prisma from "../../lib/prisma-client.js";
import {
  getDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "./route.js";
import { Role } from "@prisma/client";
import { checkRole, getCurrentUser } from "../../lib/auth-provider.js";

const doctorRouter = new OpenAPIHono();

doctorRouter.openapi(getDoctor, async (ctx) => {
  try {
    const allowedRoles: Role[] = ["ADMIN"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json("Unauthorized access", 403);
    }

    const doctor = await prisma.doctor.findMany();
    if (!doctor) {
      return ctx.json("Doctors unavailable", 404);
    }

    return ctx.json(doctor, 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json("Internal Server Error", 500);
  }
});

doctorRouter.openapi(getDoctorById, async (ctx) => {
  try {
    const user = getCurrentUser(ctx);
    if (!user) {
      return ctx.json("Unauthorized access", 403);
    }

    const allowedRoles: Role[] = ["ADMIN", "DOCTOR"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json("Unauthorized access", 403);
    }

    const doctorId = ctx.req.param("id");
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
      },
    });

    if (!doctor) {
      return ctx.json("Doctor not found", 404);
    }

    return ctx.json(doctor, 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json("Internal Server Error", 500);
  }
});

doctorRouter.openapi(updateDoctor, async (ctx) => {
  try {
    const user = getCurrentUser(ctx);
    if (!user) {
      return ctx.json("User is not authenticated", 401);
    }

    const allowedRoles: Role[] = ["ADMIN", "DOCTOR"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json(
        "Forbidden. User does not have sufficient permissions.",
        403
      );
    }

    const doctorId = ctx.req.param("id");
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
      },
    });
    if (!doctor) {
      return ctx.json("Doctor not found", 404);
    }
    const { Name, phone } = ctx.req.valid("json");

    if (user.role === "DOCTOR" && doctor?.id !== doctorId) {
      return ctx.json("Unauthorized access", 403);
    }
    await prisma.doctor.update({
      where: {
        id: doctorId,
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

    return ctx.json("Doctor updated", 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json("Internal Server Error", 500);
  }
});

doctorRouter.openapi(deleteDoctor, async (ctx) => {
  try {
    const user = getCurrentUser(ctx);
    if (!user) {
      return ctx.json("User is not authenticated", 401);
    }
    const allowedRoles: Role[] = ["ADMIN", "DOCTOR"];
    if (!checkRole(allowedRoles, ctx)) {
      return ctx.json(
        "Forbidden. User does not have sufficient permissions.",
        403
      );
    }
    const doctorId = ctx.req.param("id");
    const doctor = await prisma.doctor.delete({
      where: {
        id: doctorId,
      },
    });
    if (!doctor) {
      return ctx.json("User not found", 404);
    }
    if (user.role === "DOCTOR" && doctor?.id === doctorId) {
      return ctx.json("User does not have sufficient permissions.", 403);
    }
    return ctx.json("User has been succesfully deleted", 200);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json("Internal Server Error", 500);
  }
});

export default doctorRouter;
