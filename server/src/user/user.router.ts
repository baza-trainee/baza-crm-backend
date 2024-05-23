import { Router } from 'express';
import validator from '../validator/validator';
import { getUserByIdParamSchema } from './user.schemas';
import userController from './user.controller';
import { getUserJWT } from '../shared/middlewares/getUserJWT';

const userRouter = Router();
userRouter.use(getUserJWT);

userRouter.get(
  '/:id',
  validator({ params: getUserByIdParamSchema }),
  userController.findUserById,
);

export default ['user', userRouter];
