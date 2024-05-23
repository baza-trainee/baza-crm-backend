import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

if (JWT_SECRET === undefined) throw new Error();

export const signJWT = (payload: object, expire: string) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expire });
};

export const verifyJWT = (token: string) => {
  const result = jwt.verify(token, JWT_SECRET);
  return result;
};
