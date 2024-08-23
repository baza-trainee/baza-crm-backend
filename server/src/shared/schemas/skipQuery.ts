import Joi from 'joi';

export const skipQuerySchema = Joi.object().keys({
  skip: Joi.number().default(0),
});
