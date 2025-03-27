import { z, createRoute } from "@hono/zod-openapi";
import { patientSchema } from "../../schemas/patient.js";

export const getPatient = createRoute({
  method: "get",
  path: "/patient",
  tags: ["patient"],
  responses: {
    200: {
      description: "Patient Found",
      content: {
        "application/json": {
          schema: patientSchema.openapi({
            description: "List of all patient details",
          }),
        },
      },
    },
    403: {
      description: "Forbidden. User does not have sufficient permissions.",
    },
    404: {
      description: "Patient not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});

export const getPatientById = createRoute({
  method: "get",
  path: "/patient/{id}",
  tags: ["patient"],
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },

  responses: {
    200: {
      description: "Patient Found",
      content: {
        "application/json": {
          schema: patientSchema.openapi({
            description: "Patient details",
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
      description: "Patient not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});

export const updatePatient = createRoute({
  method: "put",
  path: "/patient/{id}",
  tags: ["patient"],
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
      description: "Patient Updated",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Patient details have been successfully updated",
            }),
          }),
        },
      },
    },
    403: {
      description: "Forbidden. User does not have sufficient permissions.",
    },
    404: {
      description: "Patient not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});

export const deletePatient = createRoute({
  method: "delete",
  path: "/patient/{id}",
  tags: ["patient"],
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }),
  },
  responses: {
    200: {
      description: "Patient Deleted",
      content: {
        "application/json": {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: "Patient has been succesfully deleted" }),
          }),
        },
      },
    },
    403: {
      description: "Forbidden. User does not have sufficient permissions.",
    },
    404: {
      description: "Patient not found.",
    },
    500: {
      description: "Unexpected server error.",
    },
  },
});
