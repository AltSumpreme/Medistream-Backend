import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { jwt } from "hono/jwt";
import { cors } from "hono/cors";
import type { JwtVariables } from "hono/jwt";
import authRouter from "./routes/auth/index.js";
import { logRequest } from "./logger.js";

type Variables = JwtVariables;

const app = new OpenAPIHono<{ Variables: Variables }>();

app.use("*", async (c, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS;

  const corsMiddleware = cors({
    origin: allowedOrigins === "*" ? "*" : allowedOrigins?.split(",") || [],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  });

  await corsMiddleware(c, async () => {
    await logRequest({
      severity: "INFO",
      message: "Incoming request",
      method: c.req.method,
      path: c.req.path,
      origin: c.req.header("origin"),
      headers: Object.fromEntries(c.req.raw.headers),
    });

    await next();
  });
});

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/health", (c) => c.text("ok"));
app.route("/auth", authRouter);

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "0.0.1",
    title: "Backend for a Medical Platform",
  },
});

app.get("/docs", swaggerUI({ url: "/openapi" }));

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET not set.");
}

app.use(jwt({ secret }));

console.log(process.env.HONO_PORT);
const port = process.env.HONO_PORT ? parseInt(process.env.HONO_PORT) : 3050;
const host = "0.0.0.0"; // Allow external access

console.log(`Server is running on http://${host}:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: host, // Explicitly bind to 0.0.0.0
});
