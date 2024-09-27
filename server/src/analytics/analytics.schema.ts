import Joi from 'joi';
import { UserStatus } from '../user/user.enum';
import { ProjectStatuses, ProjectTypes } from '../project/project.enums';

export const userAnalyticsSchema = Joi.object().keys({
  from: Joi.string().isoDate(),
  to: Joi.string().isoDate(),
  statuses: Joi.array().items(...Object.values(UserStatus)),
  technologies: Joi.array().items(Joi.number()),
  specializations: Joi.array().items(Joi.number()),
});

export const projectAnalyticsSchema = Joi.object().keys({
  statuses: Joi.array().items(...Object.values(ProjectStatuses)),
  formats: Joi.array().items(...Object.values(ProjectTypes)),
});
