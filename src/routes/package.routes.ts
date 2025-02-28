import { createPackageOpts, updatePackageStatusOpts, getPackageOpts, getRiderPackagesOpts, assignPackageOpts } from "../schema/package.schema";
import { safeBikeRoutes } from "../utility/enums";
import { authenticateToken } from "../middleware/auth.middleware";

const PackageRoutes = (fastify, options, done) => {
    fastify.addHook('preHandler', authenticateToken);

    fastify.post(safeBikeRoutes.CREATE_PACKAGE, createPackageOpts);
    fastify.put(safeBikeRoutes.UPDATE_PACKAGE_STATUS, updatePackageStatusOpts);
    fastify.get(safeBikeRoutes.GET_PACKAGE, getPackageOpts);
    fastify.get(safeBikeRoutes.GET_RIDER_PACKAGES, getRiderPackagesOpts);
    fastify.post('/packages/:packageId/assign', assignPackageOpts);
    
    done();
};

module.exports = PackageRoutes;