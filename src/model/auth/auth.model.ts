import { AppDataSource } from "../../data-source";
import { Passenger } from "../../entity/Passenger";
import { Rider } from "../../entity/Rider";
import { generateToken } from "../../utility/jwt";
const bcrypt = require("bcrypt");

export class AuthAPI {
    static async login(email: string, password: string, userType: 'passenger' | 'rider'): Promise<any> {
        const repository = userType === 'passenger' 
            ? AppDataSource.getRepository(Passenger)
            : AppDataSource.getRepository(Rider);

        const user = await repository.findOneBy({ email });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error("Invalid email or password");
        }

        // Create JWT token
        const token = generateToken({
            id: user.id,
            email: user.email,
            userType
        });

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        return {
            token,
            user: userWithoutPassword
        };
    }
}