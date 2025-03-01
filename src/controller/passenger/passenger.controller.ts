import { FastifyRequest, FastifyReply } from "fastify";
import { PassengerAccountCreationAPI } from "../../model/passenger.model";
import { PassengerAccountCreationType } from "../../utility/interfaces";

// Add this controller function
export const getAllPassengersController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const passengers = await PassengerAccountCreationAPI.getAllPassengers();
    reply.code(200).send({
      data: passengers
    });
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};

export const createPassengerController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, ResidencyAddress } = request.body as PassengerAccountCreationType;

    const newPassenger = await PassengerAccountCreationAPI.createPassenger({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      ResidencyAddress
    });

    reply.code(201).send({
      message: "Passenger account created successfully",
      data: newPassenger
    });
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};