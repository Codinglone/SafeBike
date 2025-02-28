import { Type as T } from "@sinclair/typebox";
import { createPassengerController } from "../controller/passenger/passenger.controller";

export const passengerSchema = T.Object({
  firstName: T.String({ description: 'Passenger first name' }),
  lastName: T.String({ description: 'Passenger last name' }),
  email: T.String({ format: 'email', description: 'Passenger email address' }),
  password: T.String({ description: 'Account password' }),
  ResidencyAddress: T.String({ description: 'Residential address' }),
  phoneNumber: T.String({ description: 'Contact phone number' })
});

export const postPassengerOpts = {
  schema: {
      tags: ['Passengers'],
      description: 'Create a new passenger account',
      body: passengerSchema,
      response: {
          201: T.Object({
              message: T.String(),
              data: passengerSchema
          }),
          400: T.Object({
              error: T.String()
          })
      }
  },
  handler: createPassengerController
};
