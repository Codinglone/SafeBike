import { createPassengerController } from "../../controller/passenger/passenger.controller";
import { safeBikeRoutes } from "../../utility/enums";

const UserCreation = (fastify, options, done) => {
    fastify.post(`${safeBikeRoutes.CREATE_PASSENGER}`, createPassengerController);
    done();
}

module.exports = UserCreation;
