import { postPassengerOpts } from "../../schema/passenger.schema";
import { postRiderOpts } from "../../schema/rider.schema";
import { safeBikeRoutes } from "../../utility/enums";

const UserCreation = (fastify, options, done) => {
    fastify.post(`${safeBikeRoutes.CREATE_PASSENGER}`, postPassengerOpts);
    fastify.post(`${safeBikeRoutes.CREATE_BIKER}`, postRiderOpts);
    done();
}

module.exports = UserCreation;
