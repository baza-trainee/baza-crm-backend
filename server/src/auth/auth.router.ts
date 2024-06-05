import { Router } from 'express';
import validator from '../validator/validator';
import { createUserSchema, loginUserSchema } from './auth.schemas';
import authController from './auth.controller';
import { getUserJWT } from '../shared/middlewares/getUserJWT';

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

authRouter.post('/me', getUserJWT, authController.getMe);

authRouter.get('/verify', authController.handlerVerify);

export default ['auth', authRouter];
