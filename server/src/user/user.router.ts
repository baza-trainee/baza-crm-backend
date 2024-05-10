import { Router } from 'express';
import validator from '../validator/validator';
import { getUserByIdParamSchema } from './user.schemas';
import userController from './user.controller';

const userRouter = Router();

userRouter.get(
  '/:id',
  validator({ params: getUserByIdParamSchema }),
  userController.findUserById,
);

export default ['user', userRouter];
