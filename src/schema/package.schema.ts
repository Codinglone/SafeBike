import { Type as T } from "@sinclair/typebox";
import { PackageStatus } from "../entity/Package";
import {
  createPackageController,
  updatePackageStatusController,
  getPackageController,
  getRiderPackagesController,
  assignPackageController,
  confirmPickupController,
  confirmDeliveryReceiptController,
  confirmDeliveryController,
  getAllPackagesController
} from "../controller/package.controller";
import { PackageAPI } from "../model/package.model";

export const createPackageSchema = T.Object({
  recipientName: T.String({ description: "Name of the package recipient" }),
  recipientPhone: T.String({ description: "Phone number of the recipient" }),
  recipientEmail: T.String({
    description: "Email of registered recipient passenger",
    format: "email",
  }),
  pickupLocation: T.String({ description: "Package pickup location" }),
  deliveryLocation: T.String({ description: "Package delivery location" }),
  description: T.String({ description: "Package description" }),
  estimatedValue: T.Number({
    description: "Estimated value of the package in RWF",
  }),
});

export const packageResponseSchema = T.Object({
    recipientName: T.String({ description: "Name of the package recipient" }),
    recipientPhone: T.String({ description: "Phone number of the recipient" }),
    recipientEmail: T.Optional(T.String({
      description: "Email of registered recipient passenger",
      format: "email",
    })),
    pickupLocation: T.String({ description: "Package pickup location" }),
    deliveryLocation: T.String({ description: "Package delivery location" }),
    description: T.String({ description: "Package description" }),
    estimatedValue: T.Number({
      description: "Estimated value of the package in RWF",
    }),
  });

export const updatePackageStatusSchema = T.Object({
  status: T.Enum(PackageStatus),
});

export const confirmDeliveryReceiptSchema = T.Object({});

export const confirmDeliveryReceiptOpts = {
  schema: {
    tags: ["packages"],
    description: "Confirm package receipt by recipient passenger",
    params: T.Object({
      packageId: T.String(),
    }),
    response: {
      200: T.Object({
        message: T.String(),
        data: T.Object({
          id: T.Number(),
          status: T.Enum(PackageStatus),
          confirmedAt: T.String(),
        }),
      }),
    },
  },
  handler: confirmDeliveryReceiptController,
};

export const createPackageOpts = {
  schema: {
    tags: ["packages"],
    description: "Create a new package delivery request",
    body: createPackageSchema,
    response: {
      201: T.Object({
        message: T.String(),
        data: T.Object({
          id: T.Number(),
          ...packageResponseSchema.properties,
          status: T.Enum(PackageStatus),
          createdAt: T.String(),
        }),
      }),
    },
  },
  handler: createPackageController,
};

export const updatePackageStatusOpts = {
  schema: {
    tags: ["packages"],
    description: "Update package delivery status",
    params: T.Object({
      id: T.String(),
    }),
    body: updatePackageStatusSchema,
    response: {
      200: T.Object({
        message: T.String(),
        data: T.Object({
          id: T.Number(),
          status: T.Enum(PackageStatus),
        }),
      }),
    },
  },
  handler: updatePackageStatusController,
};

export const getPackageOpts = {
  schema: {
    tags: ["packages"],
    description: "Get package delivery details",
    params: T.Object({
      id: T.String(),
    }),
    response: {
      200: T.Object({
        data: T.Object({
          id: T.Number(),
          ...packageResponseSchema.properties,
          status: T.Enum(PackageStatus),
          createdAt: T.String(),
          rider: T.Optional(
            T.Object({
              id: T.Number(),
              firstName: T.String(),
              lastName: T.String(),
              phoneNumber: T.String(),
            })
          ),
        }),
      }),
    },
  },
  handler: getPackageController,
};

export const getAllPackagesOpts = {
  schema: {
    tags: ["packages"],
    description: "Get all packages",
    response: {
      200: T.Object({
        data: T.Array(
          T.Object({
            id: T.Number(),
            status: T.Enum(PackageStatus),
            recipientName: T.String(),
            recipientPhone: T.String(),
            recipientEmail: T.Optional(T.String()),
            pickupLocation: T.String(),
            deliveryLocation: T.String(),
            description: T.String(),
            estimatedValue: T.Number(),
            createdAt: T.String(),
            updatedAt: T.String()
          })
        )
      })
    }
  },
  handler: getAllPackagesController
};

export const getRiderPackagesOpts = {
  schema: {
    tags: ["packages"],
    description: "Get all packages assigned to the rider",
    response: {
      200: T.Object({
        packages: T.Array(
          T.Object({
            id: T.Number(),
            ...createPackageSchema.properties,
            status: T.Enum(PackageStatus),
            createdAt: T.String(),
          })
        ),
      }),
    },
  },
  handler: getRiderPackagesController,
};

export const assignPackageSchema = T.Object({
  plateNumber: T.String({ description: "Rider plate number" }),
  confirmPickup: T.Boolean({ default: false }),
});

export const assignPackageOpts = {
  schema: {
    tags: ["packages"],
    description: "Assign package to rider",
    params: T.Object({
      packageId: T.String(),
    }),
    body: assignPackageSchema,
    response: {
      200: T.Object({
        message: T.String(),
        data: T.Object({
          id: T.Number(),
          status: T.Enum(PackageStatus),
          rider: T.Object({
            id: T.Number(),
            firstName: T.String(),
            lastName: T.String(),
            plateNumber: T.String(),
            phoneNumber: T.String(),
          }),
        }),
      }),
    },
  },
  handler: assignPackageController,
};

export const confirmPickupOpts = {
  schema: {
    tags: ["packages"],
    description: "Confirm package pickup by rider",
    params: T.Object({
      packageId: T.String(),
    }),
    response: {
      200: T.Object({
        message: T.String(),
        data: T.Object({
          id: T.Number(),
          status: T.Enum(PackageStatus),
          pickedUpAt: T.String(),
        }),
      }),
    },
  },
  handler: confirmPickupController,
};

export const confirmDeliveryOpts = {
  schema: {
    tags: ["packages"],
    description: "Confirm package delivery by recipient",
    params: T.Object({
      packageId: T.String(),
    }),
    response: {
      200: T.Object({
        message: T.String(),
        data: T.Object({
          id: T.Number(),
          status: T.Enum(PackageStatus),
          deliveredAt: T.String(),
        }),
      }),
    },
  },
  handler: confirmDeliveryController,
};

export const getPassengerPackagesOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                recipientName: { type: 'string' },
                recipientPhone: { type: 'string' },
                recipientEmail: { type: 'string' },
                pickupLocation: { type: 'string' },
                deliveryLocation: { type: 'string' },
                description: { type: 'string' },
                estimatedValue: { type: 'number' },
                status: { type: 'string' },
                passengerId: { type: 'number' },
                riderId: { type: ['number', 'null'] },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
              }
            }
          }
        }
      }
    }
  },
  handler: async (request, reply) => {
    try {
      if (!request.user || request.user.userType !== "passenger") {
        return reply
          .code(403)
          .send({ error: "Only passengers can view their packages" });
      }
      
      // Use your PackageAPI
      const packages = await PackageAPI.getPackagesByPassenger(request.user.id);
      
      // Return data in the correct format matching your schema
      return reply.code(200).send({ data: packages });
    } catch (error) {
      console.error("Error fetching passenger packages:", error);
      return reply.code(500).send({ 
        error: "Failed to fetch passenger packages",
        message: error.message
      });
    }
  }
};

export const getAvailablePackagesOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            // Same properties as above
            id: { type: 'number' },
            recipientName: { type: 'string' },
            recipientPhone: { type: 'string' },
            recipientEmail: { type: 'string' },
            pickupLocation: { type: 'string' },
            deliveryLocation: { type: 'string' },
            description: { type: 'string' },
            estimatedValue: { type: 'number' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  handler: async (request, reply) => {
    try {
      const availablePackages = await request.server.db.package.findMany({
        where: { 
          status: "PENDING", // Only get pending packages
          riderId: null // That aren't assigned to a rider yet
        },
        orderBy: { createdAt: 'desc' }
      });
      
      return reply.code(200).send(availablePackages);
    } catch (error) {
      console.error("Error fetching available packages:", error);
      return reply.code(500).send({ error: "Failed to fetch available packages" });
    }
  }
};