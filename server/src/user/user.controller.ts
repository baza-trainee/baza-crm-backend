import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import { findById } from './user.service';

const findUserById = async (req: Request, res: Response) => {
  const user = await findById(Number(req.params.id));
  return res.json({ user });
};

export default {
  findUserById: controllerWrapper(findUserById),
};
