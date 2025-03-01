import { Type as T } from "@sinclair/typebox";
import { createAdminController, loginAdminController, getAllAdminsController } from "../../controller/admin/admin.controller";

export const createAdminSchema = T.Object({
  firstName: T.String({ description: 'First name of admin' }),
  lastName: T.String({ description: 'Last name of admin' }),
  email: T.String({ description: 'Email address of admin', format: 'email' }),
  phoneNumber: T.String({ description: 'Phone number of admin' }),
  password: T.String({ description: 'Admin password', minLength: 6 })
});

export const createAdminOpts = {
  schema: {
    tags: ['admins'],
    description: 'Create a new admin account',
    body: createAdminSchema,
    response: {
      201: T.Object({
        id: T.Number(),
        firstName: T.String(),
        lastName: T.String(),
        email: T.String(),
        phoneNumber: T.String(),
        token: T.String()
      })
    }
  },
  handler: createAdminController
};

export const loginAdminSchema = T.Object({
  email: T.String({ description: 'Admin email address', format: 'email' }),
  password: T.String({ description: 'Admin password' })
});

export const loginAdminOpts = {
  schema: {
    tags: ['admins'],
    description: 'Login as an admin',
    body: loginAdminSchema,
    response: {
      200: T.Object({
        id: T.Number(),
        firstName: T.String(),
        lastName: T.String(),
        email: T.String(),
        phoneNumber: T.String(),
        token: T.String()
      })
    }
  },
  handler: loginAdminController
};

export const getAllAdminsOpts = {
  schema: {
    tags: ['admins'],
    description: 'Get all admin accounts (admin only)',
    response: {
      200: T.Object({
        data: T.Array(
          T.Object({
            id: T.Number(),
            firstName: T.String(),
            lastName: T.String(),
            email: T.String(),
            phoneNumber: T.String(),
            createdAt: T.String(),
            updatedAt: T.String()
          })
        )
      })
    }
  },
  handler: getAllAdminsController
};