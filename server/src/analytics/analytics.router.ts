import { Router } from 'express';
import { getUserJWT } from '../shared/middlewares/getUserJWT';
import { isAdmin } from '../shared/middlewares/isAdmin';
import validator from '../validator/validator';
import analyticsController from './analytics.controller';
import * as analyticsSchema from './analytics.schema';

const analyticsRouter = Router();
analyticsRouter.use(getUserJWT, isAdmin);

/**
 * @openapi
 * tags:
 *   name: Analytics
 *   description: Analytics information
 */

/**
 * @openapi
 * /analytics/users:
 *   post:
 *     summary: get user analytics
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               technologies:
 *                 type: array
 *                 items: 
 *                   type: number
 *               specializations:
 *                 type: array
 *                 items: 
 *                   type: number
 *               statuses:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [active,working,pause]
 *             example:
 *               from: 2024-09-24
 *               to: 2024-09-27
 *               technologies: [1,2,4,5]
 *               specializations: [1,2,4]
 *               statuses: [active,working]
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
analyticsRouter.post(
  '/users',
  validator({ body: analyticsSchema.userAnalyticsSchema }),
  analyticsController.getUserAnalytics,
);

/**
 * @openapi
 * /analytics/projects:
 *   post:
 *     summary: get projects analytics
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statuses:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [searching,working,ended]
 *               formats:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [free,light,strong]
 *             example:
 *               statuses: [searching,working]
 *               formats: [free,light]
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
analyticsRouter.post(
  '/projects',
  validator({ body: analyticsSchema.projectAnalyticsSchema }),
  analyticsController.getProjectAnalytics,
);

export default ['analytics', analyticsRouter];
