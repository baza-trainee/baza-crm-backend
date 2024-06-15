import { Router } from 'express';
import validator from '../validator/validator';
import complaintsController from './complaint.controller';
import {
  complaintIdSchema,
  complaintIsCheckedSchema,
  createComplainSchema,
} from './complaint.schemas';
import { getUserJWT } from '../shared/middlewares/getUserJWT';
import { isAdmin } from '../shared/middlewares/isAdmin';

const complaintRouter = Router();
complaintRouter.use(getUserJWT);

/**
 * @openapi
 * tags:
 *   name: Complaint
 *   description: Complaint information
 */

/**
 * @openapi
 * /complaint/:
 *   post:
 *     summary: create complaint
 *     tags: [Complaint]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *             example:
 *               title: Hi problem
 *               text: Lorem ipsum
 *     responses:
 *       200:
 *         description: Ok
 */
complaintRouter.post(
  '/',
  validator({ body: createComplainSchema }),
  complaintsController.createComplaint,
);

complaintRouter.use(isAdmin);

/**
 * @openapi
 * /complaint/:
 *   get:
 *     summary: get all complaint
 *     tags: [Complaint]
 *     responses:
 *       200:
 *         description: Ok
 */
complaintRouter.get('/', complaintsController.getAllComplaints);

/**
 * @openapi
 * /complaint/{complaintId}:
 *   get:
 *     summary: get complaint by id
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: complaintId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
complaintRouter.get(
  '/:complaintId',
  validator({ params: complaintIdSchema }),
  complaintsController.getByIdComplaint,
);

/**
 * @openapi
 * /complaint/{complaintId}:
 *   delete:
 *     summary: delete complaint by id
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: complaintId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
complaintRouter.delete(
  '/:complaintId',
  validator({ params: complaintIdSchema }),
  complaintsController.deleteComplaints,
);

/**
 * @openapi
 * /complaint/{complaintId}:
 *   patch:
 *     summary: update complaint by id
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: complaintId
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
 *               isChecked:
 *                 type: boolean
 *             example:
 *               isChecked: true
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
complaintRouter.patch(
  '/:complaintId',
  validator({ params: complaintIdSchema, body: complaintIsCheckedSchema }),
  complaintsController.setCheckedComplaint,
);

export default ['complaint', complaintRouter];
