import { FastifyReply, FastifyRequest } from "fastify";
import { RiderAccountCreationAPI } from "../../model/rider.model";

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

export { createRiderController };