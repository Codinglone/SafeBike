import { FastifyRequest, FastifyReply } from "fastify";
const jwt = require('jsonwebtoken');

interface AuthenticatedRequest extends FastifyRequest {
    user?: {
        id: number;
        email: string;
        userType: 'passenger' | 'rider';
    };
}

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