import { NextFunction, Request, Response } from 'express';
import getConfigValue from '../config/config';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500);
  if (getConfigValue('NODE_ENV') === 'production')
    return res.json({ message: 'Something gone wrong' });
  console.log(err);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}
