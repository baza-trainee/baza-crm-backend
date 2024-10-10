import jwt from 'jsonwebtoken';
import getConfigValue from '../config/config';

const JWT_SECRET = getConfigValue('JWT_SECRET');

export const signJWT = (payload: object, expire: string) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expire });
};

export const verifyJWT = (token: string) => {
  const result = jwt.verify(token, JWT_SECRET);
  if (typeof result === 'string') {
    throw new Error('Invalid jwt');
  }
  return result;
};
