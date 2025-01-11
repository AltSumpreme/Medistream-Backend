import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

type Varible = JwtVariables;
const app = new OpenAPIHono<{ Variables: Varible }>();
app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

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
  throw new Error("JWT_SECRET is not defined");
}
app.use(jwt({ secret }));

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
