import Joi from 'joi';

export const createTagSchema = Joi.object({
  name: Joi.string().required(),
});

export const editTagSchema = Joi.object({
  name: Joi.string().required(),
});

export const tagIdParamSchema = Joi.object({
  id: Joi.number().required(),
});

export const addTagToUserSchema = Joi.object({
  userId: Joi.number().required(),
  tagId: Joi.number().required(),
});
