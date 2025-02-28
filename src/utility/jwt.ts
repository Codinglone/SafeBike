require('dotenv').config();
const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET;

interface TokenPayload {
    id: number;
    email: string;
    userType: 'passenger' | 'rider';
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
};