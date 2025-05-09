import { createRoute, z } from "@hono/zod-openapi";
import { doctorSchema } from "../../schemas/doctor.js";

export const getDoctor = createRoute({
  method: "get",
  path: "/doctor",
  tags: ["Doctor"],
  description: "Get all doctors",
  security: [{ Bearer: [] }],
  responses: {
    200: {
      description: "Doctor Found",
      content: {
        "application/json": {
          schema: doctorSchema.openapi({
            description: "List of all doctor details",
          }),
        },
      },
    },
    403: {
      description: "Forbidden. User does not have sufficient permissions.",
    },
    404: {
      description: "Doctor not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});

export const getDoctorById = createRoute({
  method: "get",
  path: "/doctor/{id}",
  tags: ["Doctor"],
  description: "Get doctor by ID",
  security: [{ Bearer: [] }],
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },
  responses: {
    200: {
      description: "Doctor Found",
      content: {
        "application/json": {
          schema: doctorSchema.openapi({
            description: "Doctor details",
          }),
        },
      },
    },
    401: {
      description: "User is not authenticated",
    },
    403: {
      description: "Forbidden. User does not have sufficient permissions.",
    },
    404: {
      description: "Doctor not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});

export const updateDoctor = createRoute({
  method: "put",
  path: "/doctor/{id}",
  tags: ["Doctor"],
  description: "Update doctor by ID",
  security: [{ Bearer: [] }],
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            Name: z.string().openapi({ example: "John Doe" }),
            phone: z.string().openapi({ example: "98902823234" }),
          }),
        },
      },
    },
  },

  responses: {
    200: {
      description: "Doctor Updated",
      content: {
        "application/json": {
          schema: doctorSchema.openapi({
            description: "Doctor details",
          }),
        },
      },
    },
    401: {
      description: "User is not authenticated",
    },
    403: {
      description: "Forbidden. User does not have sufficient permissions.",
    },
    404: {
      description: "Doctor not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});

export const deleteDoctor = createRoute({
  method: "delete",
  path: "/doctor/{id}",
  tags: ["Doctor"],
  description: "Delete doctor by ID",
  security: [{ Bearer: [] }],
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },
  responses: {
    200: {
      description: "Doctor Deleted",
    },
    401: {
      description: "User is not authenticated",
    },
    403: {
      description: "Forbidden. User does not have sufficient permissions.",
    },
    404: {
      description: "Doctor not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});
