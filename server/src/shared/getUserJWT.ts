import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
if (JWT_SECRET === undefined) throw new Error();

export const getUserJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new Error('Not authorized'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(new Error('Not authorized'));
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    return next(new Error('Not authorized'));
  }
};
