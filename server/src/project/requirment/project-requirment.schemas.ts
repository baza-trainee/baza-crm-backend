import Joi from 'joi';
import { IProjectRequirmentDto } from './project-requirment.types';

export const ProjectRequirmentCountSchema = Joi.object<IProjectRequirmentDto>({
  count: Joi.number().required(),
});
