import Joi from 'joi';
import { ICreateUserRequest } from './user-request.types';

export const createUserRequestSchema = Joi.object<ICreateUserRequest>().keys({
  city: Joi.string().required(),
  country: Joi.string().required(),
  discord: Joi.string().required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  linkedin: Joi.string().required(),
  phone: Joi.string().required(),
  specialization: Joi.string().required(),
});

export const resolveUserRequestParamSchema = Joi.object().keys({
  requestId: Joi.number().required(),
});

export const resolveUserRequestSchema = Joi.object().keys({
  accepted: Joi.boolean().required(),
});

export const resolvedQuerySchema = Joi.object().keys({
  resolved: Joi.boolean().default(0),
});