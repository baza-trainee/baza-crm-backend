import { Router } from 'express';
import validator from '../validator/validator';
import { createUserSchema, loginUserSchema } from './auth.schemas';
import authController from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/register',
  validator({ body: createUserSchema }),
  authController.register,
);

authRouter.post(
  '/login',
  validator({ body: loginUserSchema }),
  authController.login,
);

export default ['auth', authRouter];
