import * as jwt from 'jsonwebtoken';

// Update this interface to include 'admin' type
interface TokenPayload {
  id: number;
  email: string;
  userType: 'passenger' | 'rider' | 'admin'; // Add 'admin' here
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'codextreme', {
    expiresIn: '7d'
  });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET || 'codextreme') as TokenPayload;
};