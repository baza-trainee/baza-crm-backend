import { Request, Response, NextFunction } from 'express';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.user)
  if (!req.user.isAdmin) return next(new Error('Not an admin'));
  next();
};
