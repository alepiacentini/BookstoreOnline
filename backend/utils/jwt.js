import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createToken(payload) {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_SECRET mancante');
  }

  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
}

export function verifyToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET mancante');
  }

  return jwt.verify(token, process.env.JWT_KEY);
}
