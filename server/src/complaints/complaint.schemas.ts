import Joi from "joi";

export const createComplainSchema = Joi.object().keys({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

export const complaintIdSchema = Joi.object({
complaintId: Joi.number().required(),
});

export const complaintIsCheckedSchema = Joi.object({
  isChecked: Joi.boolean(),
});
