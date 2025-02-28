import { AuthAPI } from "../../model/auth/auth.model";

export const loginController = async (req, reply) => {
    try {
        const { email, password, userType } = req.body;
        const response = await AuthAPI.login(email, password, userType);
        reply.code(200).send(response);
    } catch (err) {
        reply.code(401).send({ error: err.message });
    }
};