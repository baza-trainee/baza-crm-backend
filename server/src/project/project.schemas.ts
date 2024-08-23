import Joi from 'joi';
import { IProjectCreate, IProjectUpdate } from './project.types';
import { ProjectStatuses, ProjectTypes } from './project.enums';

export const projectIdParamSchema = Joi.object({
  projectId: Joi.string().required(),
});

export const createProjectSchema = Joi.object<IProjectCreate>({
  description: Joi.string().required(),
  name: Joi.string().required(),
  projectPoints: Joi.number().required(),
  projectType: Joi.string()
    .valid(...Object.values(ProjectTypes))
    .required(),
  price: Joi.number().required(),
});

export const updateProjectSchema = Joi.object<IProjectUpdate>({
  description: Joi.string().optional(),
  name: Joi.string().optional(),
  projectPoints: Joi.number().optional(),
  projectType: Joi.string()
    .valid(...Object.values(ProjectTypes))
    .optional(),
  price: Joi.number().optional(),
  site: Joi.string().uri().optional(),
});

export const updateProjectStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(ProjectStatuses))
    .required(),
});
