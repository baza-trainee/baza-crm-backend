import Joi from 'joi';
import {
  IProjectMemberAddDto,
  IProjectMemberRemoveDto,
} from './project-member.types';

export const ProjectMemberRemoveSchema = Joi.object<IProjectMemberRemoveDto>({
  userId: Joi.number().required(),
});

export const ProjectMemberAddSchema = Joi.object({
  tagId: Joi.number().required(),
  email: Joi.string().email().required(),
});
