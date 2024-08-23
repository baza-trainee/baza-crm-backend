import Joi from 'joi';
import { IProjectAplicationResolveDto } from './project-aplication.types';

export const ProjectAplicationResolveSchema =
  Joi.object<IProjectAplicationResolveDto>({
    aplicationId: Joi.number().required(),
    status: Joi.string().allow('accepted', 'declined').required(),
  });
