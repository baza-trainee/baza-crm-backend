import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';

import { userLogin, userRegistration } from './auth.service';

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const newUser = await userRegistration(email, password);

  res.status(201).json('Success');
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userLogin(email, password);

  res.json(user);
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
};
