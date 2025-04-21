import { OpenAPIHono } from "@hono/zod-openapi";
import { getUser } from "./route.js";
import prisma from "../../lib/prisma-client.js";

const userRouter = new OpenAPIHono();

userRouter.openapi(getUser, async (ctx) => {
  const payload = ctx.get("jwtPayload");
  const userId = payload?.userId;

  if (!userId) {
    return ctx.json({ message: "Invalid token payload" }, 400);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return ctx.json({ message: "User not found" }, 404);
    }

    return ctx.json({
      id: user.id,
      name: user.Name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

export default userRouter;
