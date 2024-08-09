import { Router } from 'express';
import validator from '../../validator/validator';
import { projectIdParamSchema } from '../project.schemas';
import { isAdmin } from '../../shared/middlewares/isAdmin';
import projectMemberController from './project-member.controller';
import {
  ProjectMemberAddSchema,
  ProjectMemberRemoveSchema,
} from './project-member.schema';

export const projectMemberRouter = Router({ mergeParams: true });
/**
 * @openapi
 * tags:
 *   name: Project Member
 *   description: Project member information
 */

/**
 * @openapi
 * /project/{projectId}/member/:
 *   get:
 *     summary: get project members
 *     tags: [Project, Project Member]
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
projectMemberRouter.get(
  '/',
  validator({ params: projectIdParamSchema }),
  projectMemberController.getProjectMembers,
);

/**
 * @openapi
 * /project/{projectId}/member/:
 *   delete:
 *     summary: remove member from project  by id
 *     tags: [Project, Project Member]
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
 *               userId:
 *                 type: number
 *             example:
 *               userId: 5
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectMemberRouter.delete(
  '/',
  isAdmin,
  validator({
    params: projectIdParamSchema,
    body: ProjectMemberRemoveSchema,
  }),
  projectMemberController.removeMemberFromProject,
);

/**
 * @openapi
 * /project/{projectId}/member/:
 *   post:
 *     summary: add member to project by email
 *     tags: [Project, Project Member]
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
 *               email:
 *                 type: string
 *               tagId:
 *                 type: number
 *             example:
 *               email: user0@gmail.com
 *               tagId: 3
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
projectMemberRouter.post(
  '/',
  isAdmin,
  validator({
    params: projectIdParamSchema,
    body: ProjectMemberAddSchema,
  }),
  projectMemberController.addMemberToProject,
);

export default ['projectMember', projectMemberRouter, true];
