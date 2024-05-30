import { Router } from 'express';
import validator from '../validator/validator';
import complaintsController from './complaint.controller';
import { complaintIdSchema, createComplainSchema } from './complaint.schemas';

const complaintRouter = Router();

complaintRouter.post(
  '/create',
  validator({ body: createComplainSchema }),
  complaintsController.createComplaint,
);

complaintRouter.get(
  '/',
  complaintsController.getAllComplaints,
);

complaintRouter.get(
  '/:id',
  validator({ params: complaintIdSchema }),
  complaintsController.getByIdComplaint,
);

complaintRouter.delete(
  '/:id',
  validator({ params: complaintIdSchema }),
  complaintsController.deleteComplaints,
);


export default ['complaint', complaintRouter];
