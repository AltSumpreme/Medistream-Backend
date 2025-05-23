import { OpenAPIHono } from "@hono/zod-openapi";
import { v4 } from "uuid";
import { sign } from "hono/jwt";
import prisma from "../../lib/prisma-client.js";
import { hashPassword, checkPassword } from "../../utils/password.js";
import { login, register } from "./route.js";

const authRouter = new OpenAPIHono();

authRouter.openapi(login, async (ctx) => {
  try {
    const { email, password } = ctx.req.valid("json");

    if (!process.env.JWT_SECRET) {
      return ctx.json({ message: "Internal Server Error" }, 500);
    }

    const auth = await prisma.auth.findUnique({
      where: {
        email,
      },
      include: {
        user: true,
      },
    });

    if (!auth) {
      return ctx.json({ message: "User does not exist" }, 404);
    }

    const truePassword = await checkPassword(password, auth?.password);

    if (truePassword) {
      const token = await sign(
        {
          userId: auth.id,
          role: auth.user?.role,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // Token expires in 2 hours
        },
        process.env.JWT_SECRET
      );

      return ctx.json({ token: token }, 200);
    } else {
      return ctx.json({ message: "Invalid email or password" }, 403);
    }
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

authRouter.openapi(register, async (ctx) => {
  try {
    const { Name, role, email, password, phone } = ctx.req.valid("json");

    if (!process.env.JWT_SECRET) {
      return ctx.json({ message: "Internal Server Error" }, 500);
    }

    const [existingAuth, existingUser] = await prisma.$transaction([
      prisma.auth.findUnique({
        where: { email },
      }),
      prisma.user.findFirst({
        where: {
          OR: [{ phone }],
        },
      }),
    ]);
    if (existingAuth || existingUser) {
      return ctx.json({ message: "The user already exists" }, 400);
    }

    const hashedPassword = await hashPassword(password as string);

    const newUser = await prisma.$transaction(async (cx) => {
      const authId = v4();
      const userId = v4();

      const auth = await cx.auth.create({
        data: {
          id: authId,
          email,
          password: hashedPassword,
          user: {
            create: {
              id: userId,
              role,
              Name,
              phone,
            },
          },
        },
        include: { user: true },
      });

      if (role === "PATIENT") {
        await cx.patient.create({
          data: {
            userId: userId,
          },
        });
      } else if (role === "DOCTOR") {
        await cx.doctor.create({
          data: {
            userId: userId,
          },
        });
      }

      return auth;
    });

    const token = await sign(
      {
        userId: newUser.user?.id,
        role: newUser.user?.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1h
      },
      process.env.JWT_SECRET
    );

    return ctx.json({ token: token }, 201);
  } catch (err) {
    console.log("Error occured", err);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

export default authRouter;
