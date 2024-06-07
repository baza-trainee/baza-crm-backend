import { NextFunction, Request, Response } from 'express';

export const extendFn = (req: Request, res: Response, next: NextFunction) => {
  req.getUserId = function () {
    const userId = Number(this.user.id);
    if (isNaN(userId)) next(new Error('something gone wrong'));
    return userId;
  };
  next();
};
