import { Router } from 'express';
import validator from '../validator/validator';
import { getUserJWT } from '../shared/middlewares/getUserJWT';
import userRequestController from './user-request.controller';
import * as userRequestSchemas from './user-request.schemas';
import { isAdmin } from '../shared/middlewares/isAdmin';
import { skipQuerySchema } from '../shared/schemas/skipQuery';

const userRequestRouter = Router();

/**
 * @openapi
 * tags:
 *   name: User request
 *   description: User request information
 */

/**
 * @openapi
 * /userRequest:
 *   post:
 *     summary: create user request
 *     tags: [User request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               discord:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               phone:
 *                 type: string
 *               specialization:
 *                 type: string
 *             example:
 *               city: Lviv
 *               country: Ukraine
 *               discord: admin#4536
 *               email: admin@gmail.com
 *               firstName: Adam
 *               lastName: Smasher
 *               linkedin: link
 *               phone: +380 565 454 352
 *               specialization: Backend
 *     responses:
 *       200:
 *         description: Ok
 */
userRequestRouter.post(
  '/',
  validator({ body: userRequestSchemas.createUserRequestSchema }),
  userRequestController.createUserRequest,
);

userRequestRouter.use(getUserJWT, isAdmin);

/**
 * @openapi
 * /userRequest/{requestId}:
 *   patch:
 *     summary: resolve user request
 *     tags: [User request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accepted:
 *                 type: boolean
 *             example:
 *               accepted: true
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
userRequestRouter.patch(
  '/:requestId',
  validator({
    params: userRequestSchemas.resolveUserRequestParamSchema,
    body: userRequestSchemas.resolveUserRequestSchema,
  }),
  userRequestController.resolveUserRequest,
);
/**
 * @openapi
 * /userRequest:
 *   get:
 *     summary: get all requests
 *     tags: [User request]
 *     parameters:
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: number
 *           default: 0
 *       - in: query
 *         name: resolved
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
userRequestRouter.get(
  '/',
  validator({
    query: [skipQuerySchema, userRequestSchemas.resolvedQuerySchema],
  }),
  userRequestController.getAllRequest,
);

/**
 * @openapi
 * /userRequest/{requestId}:
 *   get:
 *     summary: get request by id
 *     tags: [User request]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
userRequestRouter.get(
  '/:requestId',
  validator({ params: userRequestSchemas.resolveUserRequestParamSchema }),
  userRequestController.getById,
);

export default ['userRequest', userRequestRouter];
