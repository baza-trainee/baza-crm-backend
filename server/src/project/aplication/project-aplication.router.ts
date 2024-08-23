import { Router } from 'express';
import validator from '../../validator/validator';
import { tagIdParamSchema } from '../../tag/tag.schemas';
import { projectIdParamSchema } from '../project.schemas';
import projectAplicationController from './project-aplication.controller';
import { isAdmin } from '../../shared/middlewares/isAdmin';
import { ProjectAplicationResolveSchema } from './project-aplication.schemas';

export const projectAplicationRouter = Router({ mergeParams: true });
/**
 * @openapi
 * tags:
 *   name: Project Aplication
 *   description: Project aplication information
 */

/**
 * @openapi
 * /project/{projectId}/aplication/:
 *   get:
 *     summary: get project aplications
 *     tags: [Project, Project Aplication]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectAplicationRouter.get(
  '/',
  isAdmin,
  validator({ params: projectIdParamSchema }),
  projectAplicationController.getProjectAplication,
);

/**
 * @openapi
 * /project/{projectId}/aplication/resolve:
 *   post:
 *     summary: resolve project aplication by id
 *     tags: [Project, Project Aplication]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aplicationId:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [accepted,declined]
 *             example:
 *               aplicationId: 2
 *               status: accepted
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectAplicationRouter.post(
  '/resolve',
  isAdmin,
  validator({
    params: projectIdParamSchema,
    body: ProjectAplicationResolveSchema,
  }),
  projectAplicationController.resolveProjectAplication,
);

/**
 * @openapi
 * /project/{projectId}/aplication/{tagId}:
 *   post:
 *     summary: create project aplication
 *     tags: [Project, Project Aplication]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectAplicationRouter.post(
  '/:tagId',
  validator({ params: [projectIdParamSchema, tagIdParamSchema] }),
  projectAplicationController.createProjectAplication,
);

export default ['projectAplication', projectAplicationRouter, true];
