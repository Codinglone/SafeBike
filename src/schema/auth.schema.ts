import { Type as T } from "@sinclair/typebox";
import { loginController } from "../controller/auth/auth.controller";

export const loginSchema = T.Object({
    email: T.String({ format: 'email' }),
    password: T.String(),
    userType: T.Enum({ 
        passenger: 'passenger',
        rider: 'rider'
    })
}, {
    additionalProperties: false,
    required: ['email', 'password', 'userType']
});

export const loginResponseSchema = T.Object({
    token: T.String(),
    user: T.Object({
        id: T.Number(),
        firstName: T.String(),
        lastName: T.String(),
        email: T.String(),
        phoneNumber: T.String(),
        ResidencyAddress: T.String()
    })
});

export const loginOpts = {
    schema: {
        tags: ['auth'],
        body: loginSchema,
        response: {
            200: loginResponseSchema,
            401: T.Object({
                error: T.String()
            })
        }
    },
    handler: loginController
};