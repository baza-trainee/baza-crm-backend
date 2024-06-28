import { Router } from 'express'
import validator from '../../validator/validator'
import { tagIdParamSchema } from '../../tag/tag.schemas'
import { projectIdParamSchema } from '../project.schemas'
import { ProjectRequirmentCountSchema } from './project-requirment.schemas'
import projectRequirmentController from './project-requirment.controller'

export const projectRequirmentRouter = Router({ mergeParams: true })
/**
 * @openapi
 * tags:
 *   name: Project requirment
 *   description: Project requirment information
 */


/**
 * @openapi
 * /project/{projectId}/requirment/{tagId}:
 *   post:
 *     summary: create project requirment by id
 *     tags: [Project, Project requirment]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: number
 *             example:
 *               count: text
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectRequirmentRouter.post(
  '/',
  validator({
    params: [tagIdParamSchema, projectIdParamSchema],
    body: ProjectRequirmentCountSchema,
  }),
  projectRequirmentController.createProjectRequirment,
)

/**
 * @openapi
 * /project/{projectId}/requirment/{tagId}:
 *   delete:
 *     summary: delete project requirment by id
 *     tags: [Project, Project requirment]
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
projectRequirmentRouter.delete(
  '/',
  validator({
    params: [tagIdParamSchema, projectIdParamSchema],
  }),
  projectRequirmentController.deleteProjectRequirment,
)
/**
 * @openapi
 * /project/{projectId}/requirment/{tagId}:
 *   patch:
 *     summary: edit project requirment by id
 *     tags: [Project, Project requirment]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: number
 *             example:
 *               count: text
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectRequirmentRouter.patch(
  '/',
  validator({
    params: [tagIdParamSchema, projectIdParamSchema],
    body: ProjectRequirmentCountSchema,
  }),
  projectRequirmentController.updateProjectRequirment,
)

export default ['projectRequriment', projectRequirmentRouter, true]
