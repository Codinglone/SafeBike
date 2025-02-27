import { PassengerAccountCreationAPI } from "../../model/passenger.model";

const createPassengerController = async (req, reply) => {
  try {
    const response = await PassengerAccountCreationAPI.createPassenger(
      req.body
    );
    reply.code(201).send(response);
  } catch (err) {
    reply.code(204).send(err);
  }
};

export { createPassengerController };