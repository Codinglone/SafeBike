import { FastifyReply, FastifyRequest } from "fastify";
import { RiderAccountCreationAPI } from "../../model/rider.model";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

// Add this controller function
export const getAllRidersController = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const riders = await RiderAccountCreationAPI.getAllRiders();
      reply.code(200).send({
        data: riders
      });
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  };

const createRiderController = async (req, reply) => {
    try {
        const response = await RiderAccountCreationAPI.createRider(req.body);
        reply.code(201).send(response);
    } catch (err) {
        reply.code(204).send(err);
    }
};

 const updateAvailabilityController = async (
  request: FastifyRequest<{
    Body: { isAvailable: boolean };
  }> & AuthenticatedRequest,
  reply: FastifyReply
) => {
  try {
    if (!request.user || request.user.userType !== "rider") {
      return reply.code(403).send({ 
        error: "Only riders can update their availability status" 
      });
    }

    const { isAvailable } = request.body;
    const riderId = request.user.id;

    const updatedRider = await RiderAccountCreationAPI.updateAvailability(
      riderId,
      isAvailable
    );

    reply.code(200).send({
      message: `Rider status updated to ${isAvailable ? 'available' : 'unavailable'}`,
      data: {
        id: updatedRider.id,
        firstName: updatedRider.firstName,
        lastName: updatedRider.lastName,
        isAvailable: updatedRider.isAvailable
      }
    });
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};
export { createRiderController, updateAvailabilityController };