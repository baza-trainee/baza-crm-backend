import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as UserService from './user.service';

const findUserById = async (req: Request, res: Response) => {
  const user = await UserService.findById(Number(req.params.id));
  return res.json({ user });
};

const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await UserService.updateUser(req.user.id, req.body);
  return res.json({ updatedUser });
};

export default {
  findUserById: controllerWrapper(findUserById),
  updateUser: controllerWrapper(updateUser),
};
