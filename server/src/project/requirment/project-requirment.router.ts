import { Router } from 'express';
import validator from '../../validator/validator';
import { tagIdParamSchema } from '../../tag/tag.schemas';
import { projectIdParamSchema } from '../project.schemas';
import { ProjectRequirmentCountSchema } from './project-requirment.schemas';
import projectRequirmentController from './project-requirment.controller';

export const projectRequirmentRouter = Router({ mergeParams: true });

projectRequirmentRouter.post(
  '/',
  validator({
    params: [tagIdParamSchema, projectIdParamSchema],
    body: ProjectRequirmentCountSchema,
  }),
  projectRequirmentController.createProjectRequirment,
);

projectRequirmentRouter.delete(
  '/',
  validator({
    params: [tagIdParamSchema, projectIdParamSchema],
  }),
  projectRequirmentController.deleteProjectRequirment,
);

projectRequirmentRouter.patch(
  '/',
  validator({
    params: [tagIdParamSchema, projectIdParamSchema],
    body: ProjectRequirmentCountSchema,
  }),
  projectRequirmentController.updateProjectRequirment,
);

export default ['projectRequriment', projectRequirmentRouter, true];
