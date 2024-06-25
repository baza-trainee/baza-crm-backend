import { Router } from 'express';
import validator from '../validator/validator';

import { getUserJWT } from '../shared/middlewares/getUserJWT';

import { isAdmin } from '../shared/middlewares/isAdmin';
import projectController from './project.controller';
import * as projectSchemas from './project.schemas';

const projectRouter = Router();
projectRouter.use(getUserJWT);

/**
 * @openapi
 * tags:
 *   name: Project
 *   description: Project information
 */

/**
 * @openapi
 * /project/:
 *   get:
 *     summary: get project
 *     tags: [Project]
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectRouter.get('/', projectController.findAllProject);

/**
 * @openapi
 * /project/{projectId}:
 *   get:
 *     summary: get project by id
 *     tags: [Project]
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
projectRouter.get('/:projectId', projectController.findProjectById);

projectRouter.use(isAdmin);

/**
 * @openapi
 * /project:
 *   post:
 *     summary: createProject
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               name:
 *                 type: string
 *               projectPoints:
 *                 type: number
 *               projectType:
 *                 type: string
 *                 enum:
 *                   - free
 *                   - light
 *                   - strong
 *               price:
 *                 type: number
 *             example:
 *               description: text
 *               name: text
 *               projectPoints: 5
 *               projectType: free
 *               price: 0
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectRouter.post(
  '/',
  validator({
    body: projectSchemas.createProjectSchema,
  }),
  projectController.createProject,
);

/**
 * @openapi
 * /project/{projectId}/status:
 *   patch:
 *     summary: get project by id
 *     tags: [Project]
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
 *               status:
 *                 type: string
 *             example:
 *               status: searching
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectRouter.patch(
  '/:projectId/status',
  validator({
    params: projectSchemas.projectByIdParamSchema,
    body: projectSchemas.updateProjectStatusSchema,
  }),
  projectController.updateProjectStatus,
);

/**
 * @openapi
 * /project/{projectId}:
 *   patch:
 *     summary: get project by id
 *     tags: [Project]
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
 *               description:
 *                 type: string
 *               name:
 *                 type: string
 *               projectPoints:
 *                 type: number
 *               projectType:
 *                 type: string
 *                 enum:
 *                   - free
 *                   - light
 *                   - strong
 *               price:
 *                 type: number
 *               paymentInfo:
 *                 type: string
 *               site:
 *                 type: string
 *             example:
 *               description: text
 *               name: text
 *               projectPoints: 5
 *               projectType: free
 *               price: 0
 *               paymentInfo: text
 *               site: text
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectRouter.patch(
  '/:projectId',
  validator({
    params: projectSchemas.projectByIdParamSchema,
    body: projectSchemas.updateProjectSchema,
  }),
  projectController.updateProject,
);

export default ['project', projectRouter];
