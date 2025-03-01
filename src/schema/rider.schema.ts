import { Type as T } from "@sinclair/typebox";
import { createRiderController, getAllRidersController } from "../controller/rider/rider.controller";

export const riderSchema = T.Object({
    firstName: T.String(),
    lastName: T.String(),
    email: T.String(),
    password: T.String(),
    plateNumber: T.String(),
    ResidencyAddress: T.String(),
    phoneNumber: T.String(),
})

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