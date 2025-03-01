import { Type as T } from "@sinclair/typebox";
import { createRiderController, getAllRidersController, updateAvailabilityController } from "../controller/rider/rider.controller";

export const riderSchema = T.Object({
    firstName: T.String(),
    lastName: T.String(),
    email: T.String(),
    password: T.String(),
    plateNumber: T.String(),
    ResidencyAddress: T.String(),
    phoneNumber: T.String(),
})

export const updateAvailabilitySchema = T.Object({
  isAvailable: T.Boolean({ description: 'Rider availability status' })
});

export const updateAvailabilityOpts = {
  schema: {
    tags: ['riders'],
    description: 'Update rider availability status',
    body: updateAvailabilitySchema,
    response: {
      200: T.Object({
        message: T.String(),
        data: T.Object({
          id: T.Number(),
          firstName: T.String(),
          lastName: T.String(),
          isAvailable: T.Boolean()
        })
      }),
      400: T.Object({
        error: T.String()
      }),
      403: T.Object({
        error: T.String()
      })
    }
  },
  handler: updateAvailabilityController
};

export const postRiderOpts = {
    schema: {
        tags: ['rider'],
        body: riderSchema,
        response: {
            201: riderSchema,
        },
    },
    handler: createRiderController,
};

export const getAllRidersOpts = {
    schema: {
      tags: ["riders"],
      description: "Get all riders",
      response: {
        200: T.Object({
          data: T.Array(
            T.Object({
              id: T.Number(),
              firstName: T.String(),
              lastName: T.String(),
              email: T.String(),
              phoneNumber: T.String(),
              plateNumber: T.String(),
              createdAt: T.String()
            })
          )
        })
      }
    },
    handler: getAllRidersController
  };