import Joi from "joi";

export const createComplainSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'any.required': `missing required field title`,
  }),
  text: Joi.string().required().messages({
    'any.required': `missing required field text`,
  }),
  isChecked: Joi.boolean(),
});

export const complaintIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const complaintIsCheckedSchema = Joi.object({
  isChecked: Joi.boolean(),
});
