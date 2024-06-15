import Joi from 'joi';

export const skipQuerySchema = Joi.object().keys({
  skip: Joi.number().required().default(0),
});
