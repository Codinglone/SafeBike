import { FastifyRequest, FastifyReply } from "fastify";
const jwt = require('jsonwebtoken');

export interface AuthenticatedRequest extends FastifyRequest {
    user?: {
        id: number;
        email: string;
        userType: 'passenger' | 'rider' | 'admin';
    };
}

export const isAdmin = async (request, reply, done) => {
  try {
    // First, authenticate the token
    await authenticateToken(request, reply);
    
    // Log for debugging
    console.log("User type from token:", request.user?.userType);
    
    // Check if authenticated user is an admin
    if (!request.user || request.user.userType !== 'admin') {
      return reply.code(403).send({
        error: "Access denied. Only administrators can access this resource."
      });
    }
    
    done();
  } catch (err) {
    // If authenticateToken already sent a response, this won't execute
    return reply.code(401).send({ error: "Authentication failed" });
  }
};

export const authenticateToken = async (request: AuthenticatedRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            reply.code(401).send({ error: 'Authentication required' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
    } catch (err) {
        reply.code(401).send({ error: 'Invalid token' });
    }
};