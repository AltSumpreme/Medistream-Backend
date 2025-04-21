import { OpenAPIHono } from "@hono/zod-openapi";
import { getUser } from "./route.js";
import prisma from "../../lib/prisma-client.js";

const userRouter = new OpenAPIHono();

userRouter.openapi(getUser, async (ctx) => {
  const payload = ctx.get("jwtPayload");

  const id = payload.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        auth: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!user) {
      return ctx.text("User not found", 404);
    }

    return ctx.json({
      id: user.id,
      name: user.Name,
      email: user.auth.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    return ctx.text(
      error instanceof Error ? error.message : "An unknown error occurred",
      500
    );
  }
});

export default userRouter;
