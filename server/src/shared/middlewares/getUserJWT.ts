import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../../jwt/jwt.service';

export const getUserJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new Error('No authorization header'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(new Error('Not bearer schema'));
  }
  try {
    const user = verifyJWT(token);
    req.user = user;
    next();
  } catch (error) {
    return next(new Error('Not authorized'));
  }
};
