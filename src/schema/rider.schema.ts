import { Type as T } from "@sinclair/typebox";
import { createRiderController } from "../controller/rider/rider.controller";

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
