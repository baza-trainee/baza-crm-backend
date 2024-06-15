import { Router } from 'express';
import validator from '../validator/validator';
import { createUserSchema, loginUserSchema } from './auth.schemas';
import authController from './auth.controller';
import { getUserJWT } from '../shared/middlewares/getUserJWT';

const authRouter = Router();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Auth information
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: admin@gmail.com
 *               password: adminTestPass
 *     responses:
 *       200:
 *         description: Ok
 */
authRouter.post(
  '/register',
  validator({ body: createUserSchema }),
  authController.register,
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *             example:
 *               email: admin@gmail.com
 *               password: adminTestPass
 *     responses:
 *       200:
 *         description: Ok
 */
authRouter.post(
  '/login',
  validator({ body: loginUserSchema }),
  authController.login,
);

/**
 * @openapi
 * /auth/me:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
authRouter.post('/me', getUserJWT, authController.getMe);

export default ['auth', authRouter];
