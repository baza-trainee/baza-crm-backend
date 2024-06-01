import { Router } from 'express';
import validator from '../validator/validator';
import complaintsController from './complaint.controller';
import { complaintIdSchema, complaintIsCheckedSchema, createComplainSchema } from './complaint.schemas';

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

complaintRouter.patch(
  '/:id',
  validator({ body: complaintIsCheckedSchema }),
  complaintsController.setCheckedComplaint,
);

export default ['complaint', complaintRouter];
