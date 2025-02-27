import { safeBikeRoutes } from "../utility/enums";
import { welcomeController } from "../controller/welcome.controller";

const welcomeSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

const welcomeOpts = {
  schema: {
    response: {
      200: welcomeSchema,
    },
  },
  handler: welcomeController,
};

const welcomeItems = (fastify, options, done) => {
  fastify.get(`${safeBikeRoutes.WELCOME}`, welcomeOpts);
  done();
};

module.exports = welcomeItems;
