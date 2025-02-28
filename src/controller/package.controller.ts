import { PackageAPI } from "../model/package.model";
import { PackageStatus } from "../entity/Package";
import { FastifyRequest, FastifyReply } from "fastify";

interface AuthenticatedRequest extends FastifyRequest {
    user?: {
        id: number;
        email: string;
        userType: 'passenger' | 'rider';
    };
}

interface PackageParams {
    packageId: string;
}

interface AssignPackageBody {
    plateNumber: string;
}

interface AssignPackageParams {
    packageId: string;
}

export const createPackageController = async (request: AuthenticatedRequest, reply: FastifyReply) => {
    try {
        if (!request.user || request.user.userType !== 'passenger') {
            return reply.code(403).send({ error: "Only passengers can create packages" });
        }

        const response = await PackageAPI.createPackage(request.body, request.user.id);
        reply.code(201).send({
            message: "Package created successfully",
            data: response
        });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const updatePackageStatusController = async (req, reply) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const riderId = status === PackageStatus.ACCEPTED ? 1 : undefined;

        const response = await PackageAPI.updatePackageStatus(
            parseInt(id),
            status,
            riderId
        );

        reply.code(200).send({
            message: "Package status updated successfully",
            data: response
        });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const getPackageController = async (req, reply) => {
    try {
        const { id } = req.params;
        const response = await PackageAPI.getPackage(parseInt(id));
        reply.code(200).send({ data: response });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const getRiderPackagesController = async (req, reply) => {
    try {
        const riderId = req.user.id;
        const response = await PackageAPI.getPackagesByRider(riderId);
        reply.code(200).send({ packages: response });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const assignPackageController = async (
    request: FastifyRequest<{ 
        Body: { plateNumber: string };
        Params: AssignPackageParams;
    }>& AuthenticatedRequest, 
    reply: FastifyReply
) => {
    try {
        if (!request.user || request.user.userType !== 'rider') {
            return reply.code(403).send({ error: "Only riders can accept packages" });
        }

        const { packageId } = request.params;
        const { plateNumber } = request.body;

        const response = await PackageAPI.assignRider(parseInt(packageId), plateNumber);
        
        reply.code(200).send({
            message: "Package assigned successfully",
            data: response
        });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const getAvailablePackagesController = async (request: AuthenticatedRequest, reply: FastifyReply) => {
    try {
        if (!request.user || request.user.userType !== 'rider') {
            return reply.code(403).send({ error: "Only riders can view available packages" });
        }

        const packages = await PackageAPI.getAvailablePackages();
        reply.code(200).send({ data: packages });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const confirmPickupController = async (
    request: FastifyRequest<{
        Params: { packageId: string };
    }> & AuthenticatedRequest,
    reply: FastifyReply
) => {
    try {
        const { packageId } = request.params;
        const riderId = request.user.id; // Assuming the rider is logged in

        const response = await PackageAPI.confirmPickup(parseInt(packageId), riderId);
        
        reply.code(200).send({
            message: "Package pickup confirmed",
            data: response
        });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const confirmDeliveryController = async (
    request: FastifyRequest<{
        Params: { packageId: string };
    }> & AuthenticatedRequest,
    reply: FastifyReply
) => {
    try {
        // Check if the user is a rider
        if (!request.user || request.user.userType !== 'rider') {
            return reply.code(403).send({ 
                error: "Only riders can mark packages as delivered"
            });
        }

        const { packageId } = request.params;
        const riderId = request.user.id;

        const response = await PackageAPI.confirmDelivery(
            parseInt(packageId),
            riderId
        );
        
        reply.code(200).send({
            message: "Package marked as delivered successfully",
            data: response
        });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

export const confirmDeliveryReceiptController = async (
    request: FastifyRequest<{
        Params: { packageId: string };
    }> & AuthenticatedRequest,
    reply: FastifyReply
) => {
    try {
        // Check if the user is a passenger
        if (!request.user || request.user.userType !== 'passenger') {
            return reply.code(403).send({ 
                error: "Only passengers can confirm package receipt"
            });
        }

        const { packageId } = request.params;
        const recipientId = request.user.id;

        const response = await PackageAPI.confirmReceipt(
            parseInt(packageId), 
            recipientId
        );
        
        reply.code(200).send({
            message: "Package receipt confirmed successfully",
            data: response
        });
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
};

