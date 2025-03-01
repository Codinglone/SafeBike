import { FastifyRequest, FastifyReply } from "fastify";
import { AdminAPI } from "../../model/admin/admin.model";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

export const createAdminController = async (
  request: FastifyRequest<{
    Body: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const admin = await AdminAPI.createAdmin(request.body);
    reply.code(201).send(admin);
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};

export const loginAdminController = async (
  request: FastifyRequest<{
    Body: {
      email: string;
      password: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;
    const admin = await AdminAPI.loginAdmin(email, password);
    reply.code(200).send(admin);
  } catch (err) {
    reply.code(401).send({ error: err.message });
  }
};

export const getAllAdminsController = async (
  request: FastifyRequest & AuthenticatedRequest,
  reply: FastifyReply
) => {
  try {
    // Only admins can view admin accounts
    if (!request.user || request.user.userType !== 'admin') {
      return reply.code(403).send({
        error: "Access denied. Only administrators can access this resource."
      });
    }

    const admins = await AdminAPI.getAllAdmins();
    reply.code(200).send({ data: admins });
  } catch (err) {
    reply.code(400).send({ error: err.message });
  }
};