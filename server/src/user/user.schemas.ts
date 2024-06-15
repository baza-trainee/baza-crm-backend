import Joi from 'joi';
import { User } from './user.entity';

export const getUserByIdParamSchema = Joi.object().keys({
  id: Joi.number().required(),
});

export const updateUserSchema = Joi.object<User>().keys({
  linkedin: Joi.string().uri().optional(),
  emailReceiving: Joi.boolean().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export const linkDiscordSchema = Joi.object().keys({
  data: Joi.string().required(),
});
