import Joi from 'joi';

export const getUserByIdParamSchema = Joi.object().keys({
  id: Joi.number().required(),
});
