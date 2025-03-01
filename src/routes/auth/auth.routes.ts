import { postPassengerOpts, getAllPassengersOpts } from "../../schema/passenger.schema";
import { postRiderOpts, getAllRidersOpts, updateAvailabilityOpts } from "../../schema/rider.schema";
import { safeBikeRoutes } from "../../utility/enums";
import { loginOpts } from "../../schema/auth.schema";
import { authenticateToken } from "../../middleware/auth.middleware";
const UserCreation = (fastify, options, done) => {

   
    fastify.get("/passengers", getAllPassengersOpts);
    fastify.post(`${safeBikeRoutes.CREATE_PASSENGER}`, {...postPassengerOpts, schema: {
        ...postPassengerOpts.schema,
        tags: ['Authentication'],
        description: 'Create a new passenger account'
    }});
    fastify.get("/riders", getAllRidersOpts);
    fastify.post(`${safeBikeRoutes.CREATE_BIKER}`, {...postRiderOpts, schema: {
        ...postRiderOpts.schema,
        tags: ['Authentication'],
        description: 'Create a new rider account'
    }});
    fastify.put("/riders/availability", {
        preHandler: authenticateToken,
        ...updateAvailabilityOpts
      });
    fastify.post(`${safeBikeRoutes.LOGIN}`, {...loginOpts, schema: {
        ...loginOpts.schema,
        tags: ['Authentication'],
        description: 'Login for both passengers and riders'
    }});

    done();
}

module.exports = UserCreation;
