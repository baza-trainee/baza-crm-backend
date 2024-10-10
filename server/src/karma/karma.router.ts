import { Router } from 'express';
import { getUserJWT } from '../shared/middlewares/getUserJWT';
import validator from '../validator/validator';
import karmaController from './karma.controller';
import * as karmaSchema from './karma.schema';

const karmaRouter = Router();
karmaRouter.use(getUserJWT);

/**
 * @openapi
 * tags:
 *   name: Karma
 *   description: Karma information
 */

/**
 * @openapi
 * /karma/prepare:
 *   post:
 *     summary: Get list of karma recievers
 *     tags: [Karma]
 *     parameters:
 *       - in: query
 *         name: data
 *         schema:
 *           type: string
 *         required: true
 *         description: Jwt token
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
karmaRouter.post(
  '/prepare',
  validator({ query: karmaSchema.prepareKamraSchema }),
  karmaController.prepareKarmaReview,
);

/**
 * @openapi
 * /karma/setKarma:
 *   post:
 *     summary: Set karma to users
 *     tags: [Karma]
 *     parameters:
 *       - in: query
 *         name: data
 *         schema:
 *           type: string
 *         required: true
 *         description: Jwt token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               karmas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                     points:
 *                       type: number
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
karmaRouter.post(
  '/setKarma',
  validator({
    body: karmaSchema.setKarmaSchema,
    query: karmaSchema.prepareKamraSchema,
  }),
  karmaController.setKarma,
);

export default ['karma', karmaRouter];
