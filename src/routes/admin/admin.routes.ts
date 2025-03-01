import { createAdminOpts, loginAdminOpts, getAllAdminsOpts } from "../../schema/admin/admin.schema";
import { authenticateToken } from "../../middleware/auth.middleware";

const AdminRoutes = (fastify, options, done) => {
  // Public routes
  fastify.post("/admins", createAdminOpts);
  fastify.post("/admins/login", loginAdminOpts);
  
  // Protected routes - require authentication
  fastify.get("/admins", {
    preHandler: authenticateToken,
    ...getAllAdminsOpts
  });
  
  done();
};

module.exports = AdminRoutes;