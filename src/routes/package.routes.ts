import {
  createPackageOpts,
  updatePackageStatusOpts,
  getPackageOpts,
  getRiderPackagesOpts,
  assignPackageOpts,
  confirmPickupOpts,
  confirmDeliveryOpts,
  confirmDeliveryReceiptOpts,
  getAllPackagesOpts
} from "../schema/package.schema";
import { safeBikeRoutes } from "../utility/enums";
import { authenticateToken, isAdmin } from "../middleware/auth.middleware";

const PackageRoutes = (fastify, options, done) => {
  fastify.addHook("preHandler", authenticateToken);
  fastify.get("/packages", getAllPackagesOpts);
  fastify.post(safeBikeRoutes.CREATE_PACKAGE, createPackageOpts);
  fastify.put(safeBikeRoutes.UPDATE_PACKAGE_STATUS, updatePackageStatusOpts);
  fastify.get(safeBikeRoutes.GET_PACKAGE, getPackageOpts);
  fastify.get(safeBikeRoutes.GET_RIDER_PACKAGES, getRiderPackagesOpts);
  fastify.post("/packages/:packageId/assign", assignPackageOpts);
  fastify.post("/packages/:packageId/pickup", confirmPickupOpts);
  fastify.post("/packages/:packageId/deliver", confirmDeliveryOpts);
  fastify.post('/packages/:packageId/confirm-receipt', confirmDeliveryReceiptOpts);
  done();
};

module.exports = PackageRoutes;
