import { Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  return res
    .status(404)
    .json({ message: `🔍 - Not Found - ${req.originalUrl}` });
}
