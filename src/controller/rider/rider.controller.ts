import { RiderAccountCreationAPI } from "../../model/rider.model";

const createRiderController = async (req, reply) => {
    try {
        const response = await RiderAccountCreationAPI.createRider(req.body);
        reply.code(201).send(response);
    } catch (err) {
        reply.code(204).send(err);
    }
};

export { createRiderController };