import { Type as T } from "@sinclair/typebox";
import { PackageStatus } from "../entity/Package";
import { createPackageController, updatePackageStatusController, getPackageController, getRiderPackagesController, assignPackageController, confirmPickupController, confirmDeliveryController } from "../controller/package.controller";

export const createPackageSchema = T.Object({
    recipientName: T.String({ description: 'Name of the package recipient' }),
    recipientPhone: T.String({ description: 'Phone number of the recipient' }),
    pickupLocation: T.String({ description: 'Package pickup location' }),
    deliveryLocation: T.String({ description: 'Package delivery location' }),
    description: T.String({ description: 'Package description' }),
    estimatedValue: T.Number({ description: 'Estimated value of the package in RWF' })
});

export const updatePackageStatusSchema = T.Object({
    status: T.Enum(PackageStatus)
});

export const createPackageOpts = {
    schema: {
        tags: ['packages'],
        description: 'Create a new package delivery request',
        body: createPackageSchema,
        response: {
            201: T.Object({
                message: T.String(),
                data: T.Object({
                    id: T.Number(),
                    ...createPackageSchema.properties,
                    status: T.Enum(PackageStatus),
                    createdAt: T.String()
                })
            })
        }
    },
    handler: createPackageController
};

export const updatePackageStatusOpts = {
    schema: {
        tags: ['packages'],
        description: 'Update package delivery status',
        params: T.Object({
            id: T.String()
        }),
        body: updatePackageStatusSchema,
        response: {
            200: T.Object({
                message: T.String(),
                data: T.Object({
                    id: T.Number(),
                    status: T.Enum(PackageStatus)
                })
            })
        }
    },
    handler: updatePackageStatusController
};

export const getPackageOpts = {
    schema: {
        tags: ['packages'],
        description: 'Get package delivery details',
        params: T.Object({
            id: T.String()
        }),
        response: {
            200: T.Object({
                data: T.Object({
                    id: T.Number(),
                    ...createPackageSchema.properties,
                    status: T.Enum(PackageStatus),
                    createdAt: T.String(),
                    rider: T.Optional(T.Object({
                        id: T.Number(),
                        firstName: T.String(),
                        lastName: T.String(),
                        phoneNumber: T.String()
                    }))
                })
            })
        }
    },
    handler: getPackageController
};

export const getRiderPackagesOpts = {
    schema: {
        tags: ['packages'],
        description: 'Get all packages assigned to the rider',
        response: {
            200: T.Object({
                packages: T.Array(T.Object({
                    id: T.Number(),
                    ...createPackageSchema.properties,
                    status: T.Enum(PackageStatus),
                    createdAt: T.String()
                }))
            })
        }
    },
    handler: getRiderPackagesController
};

export const assignPackageSchema = T.Object({
    plateNumber: T.String({ description: 'Rider plate number' }),
    confirmPickup: T.Boolean({ default: false })
});

export const assignPackageOpts = {
    schema: {
        tags: ['packages'],
        description: 'Assign package to rider',
        params: T.Object({
            packageId: T.String()
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
                        phoneNumber: T.String()
                    })
                })
            })
        }
    },
    handler: assignPackageController
};

export const confirmPickupOpts = {
    schema: {
        tags: ['packages'],
        description: 'Confirm package pickup by rider',
        params: T.Object({
            packageId: T.String()
        }),
        response: {
            200: T.Object({
                message: T.String(),
                data: T.Object({
                    id: T.Number(),
                    status: T.Enum(PackageStatus),
                    pickedUpAt: T.String()
                })
            })
        }
    },
    handler: confirmPickupController
};

export const confirmDeliveryOpts = {
    schema: {
        tags: ['packages'],
        description: 'Confirm package delivery by recipient',
        params: T.Object({
            packageId: T.String()
        }),
        response: {
            200: T.Object({
                message: T.String(),
                data: T.Object({
                    id: T.Number(),
                    status: T.Enum(PackageStatus),
                    deliveredAt: T.String()
                })
            })
        }
    },
    handler: confirmDeliveryController
};