import { Router } from 'express';
import { findById } from './user.service';
import validator from '../validator/validator';
import { getUserByIdParamSchema } from './user.schemas';

const userRouter = Router();

userRouter.get(
  '/:id',
  validator({ params: getUserByIdParamSchema }),
  async (req, res, next) => {
    try {
      if (req.params.id) {
        return res.json({ user: await findById(Number(req.params.id)) });
      }
    } catch (error) {
      next(error);
    }
  },
);

export default ['user', userRouter];
