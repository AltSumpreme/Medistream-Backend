import { z, createRoute } from "@hono/zod-openapi";
import { Role } from "@prisma/client";

export const login = createRoute({
  method: "post",
  path: "/login",
  tags: ["auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            email: z.string().email().openapi({ example: "JohnDoe@gmail.com" }),
            password: z.string().min(8).openapi({ example: "password123" }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: " User Login successful",
      content: {
        "application/json": {
          schema: z
            .object({
              token: z.string().openapi({
                example:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
              }),
            })
            .openapi("Login Response"),
        },
      },
    },

    403: {
      description: "Invalid Credentials",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Invalid Credentials" }),
          }),
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "User not found" }),
          }),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Internal Server Error" }),
          }),
        },
      },
    },
  },
});

export const register = createRoute({
  method: "post",
  path: "/register",
  tags: ["auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            Name: z.string().openapi({ example: "John Doe" }),
            role: z.nativeEnum(Role).openapi({ example: "DOCTOR" }),
            phone: z.string().openapi({ example: "98902823234" }),
            email: z
              .string()
              .email()
              .openapi({ example: " johnDoe@gmail.com" }),
            password: z.string().min(8).openapi({ example: "password123" }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "User Registered",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "User Registered" }),
          }),
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Bad Request" }),
          }),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Internal Server Error" }),
          }),
        },
      },
    },
  },
});
