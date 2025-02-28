import { postPassengerOpts } from "../../schema/passenger.schema";
import { postRiderOpts } from "../../schema/rider.schema";
import { safeBikeRoutes } from "../../utility/enums";
import { loginOpts } from "../../schema/auth.schema";
const UserCreation = (fastify, options, done) => {
    fastify.post(`${safeBikeRoutes.CREATE_PASSENGER}`, postPassengerOpts);
    fastify.post(`${safeBikeRoutes.CREATE_BIKER}`, postRiderOpts);
    fastify.post(`${safeBikeRoutes.LOGIN}`, loginOpts);
    done();
}

module.exports = UserCreation;
