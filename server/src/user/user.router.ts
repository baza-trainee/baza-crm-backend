import { Router } from 'express';
import validator from '../validator/validator';
import * as UserSchema from './user.schemas';
import userController from './user.controller';
import { getUserJWT } from '../shared/middlewares/getUserJWT';

const userRouter = Router();
userRouter.use(getUserJWT);

userRouter.get(
  '/:id',
  validator({ params: UserSchema.getUserByIdParamSchema }),
  userController.findUserById,
);

userRouter.patch(
  '/',
  validator({ body: UserSchema.updateUserSchema }),
  userController.updateUser,
);

export default ['user', userRouter];
