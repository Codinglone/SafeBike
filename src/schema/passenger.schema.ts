import { Type as T } from "@sinclair/typebox";
import { createPassengerController } from "../controller/passenger/passenger.controller";

export const passengerSchema = T.Object(
  {
    firstName: T.String(),
    lastName: T.String(),
    email: T.String(),
    password: T.String(),
    ResidencyAddress: T.String(),
    phoneNumber: T.String(),
  },
  {
    additionalProperties: false,
    required: [
      "firstName",
      "lastName",
      "email",
      "password",
      "ResidencyAddress",
      "phoneNumber",
    ],
  }
);

export const postPassengerOpts = {
  schema: {
    tags: ['passenger'],
    body: passengerSchema,
    response: {
      201: passengerSchema,
    },
  },
  handler: createPassengerController,
};
