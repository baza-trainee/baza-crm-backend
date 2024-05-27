import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';

import * as authService from './auth.service';

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const newUser = await authService.userRegistration(email, password);

  res.status(201).json('Success');
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.userLogin(email, password);

  res.json(user);
};

const getMe = async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await authService.getMe(id);
  return res.json(user)
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getMe: controllerWrapper(getMe),
};
