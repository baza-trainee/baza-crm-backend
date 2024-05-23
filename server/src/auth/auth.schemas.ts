import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
