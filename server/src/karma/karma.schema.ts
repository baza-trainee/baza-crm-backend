import Joi from 'joi';

export const prepareKamraSchema = Joi.object().keys({
  data: Joi.string().required(),
});

export const setKarmaSchema = Joi.object().keys({
  karmas: Joi.array().items({
    points: Joi.number().required().min(1).max(5),
    userId: Joi.number().required(),
  }),
});
