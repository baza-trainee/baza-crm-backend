import { Router } from 'express';
import validator from '../validator/validator';
import complaintsController from './complaint.controller';
import { complaintIdSchema, complaintIsCheckedSchema, createComplainSchema } from './complaint.schemas';
import { getUserJWT } from '../shared/middlewares/getUserJWT';

const complaintRouter = Router();
complaintRouter.use(getUserJWT);

complaintRouter.post(
  '/',
  validator({ body: createComplainSchema }),
  complaintsController.createComplaint,
);

complaintRouter.get(
  '/',
  complaintsController.getAllComplaints,
);

complaintRouter.get(
  '/:complaintId',
  validator({ params: complaintIdSchema }),
  complaintsController.getByIdComplaint,
);

complaintRouter.delete(
  '/:complaintId',
  validator({ params: complaintIdSchema }),
  complaintsController.deleteComplaints,
);

complaintRouter.patch(
  '/:complaintId',
  validator({ body: complaintIsCheckedSchema }),
  complaintsController.setCheckedComplaint,
);

export default ['complaint', complaintRouter];
