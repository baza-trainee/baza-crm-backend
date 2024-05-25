import Joi from 'joi';

export const getUserByIdParamSchema = Joi.object().keys({
  id: Joi.number().required(),
});

export const updateUserSchema = Joi.object().keys({
  linkedin: Joi.string().uri().allow('').optional(),
  name: Joi.string().allow('').optional(),
  emailReceiving: Joi.string().email(),
});
