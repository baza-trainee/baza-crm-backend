import { Request, Response, NextFunction } from 'express';

export const isDiscordLinked = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user.discordLinked) return next(new Error('discord not linked'));
  next();
};
