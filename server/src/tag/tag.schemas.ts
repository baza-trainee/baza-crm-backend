import Joi from 'joi';
import { Tag } from './tag.entity';

export const createTagSchema = Joi.object<Tag>({
  name: Joi.string().required(),
  color: Joi.string().required(),
  isSpecialization: Joi.boolean().required(),
});

export const editTagSchema = Joi.object<Tag>({
  color: Joi.string().optional(),
});

export const tagIdParamSchema = Joi.object({
  tagId: Joi.number().required(),
});
