import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as complaintService from './complaint.service';

const createComplaint = async (req: Request, res: Response) => {
  const { id } = req.user;
  await complaintService.create(req.body, Number(id));
  res.status(201).json({ status: true });
};

const getAllComplaints = async (req: Request, res: Response) => {
  const complaints = await complaintService.getAll();
  res.json(complaints);
};

const getByIdComplaint = async (req: Request, res: Response) => {
  const { complaintId } = req.params;
  const complaints = await complaintService.getById(Number(complaintId));
  res.json(complaints);
};

const setCheckedComplaint = async (req: Request, res: Response) => {
  const { complaintId } = req.params;
  const { isChecked } = req.body;

  await complaintService.setChecked(Number(complaintId), isChecked);

  res.json({ status: true });
};

const deleteComplaints = async (req: Request, res: Response) => {
  const { complaintId } = req.params;

  await complaintService.deleteItem(Number(complaintId));
  res.json({ status: true });
};

export default {
  createComplaint: controllerWrapper(createComplaint),
  getAllComplaints: controllerWrapper(getAllComplaints),
  getByIdComplaint: controllerWrapper(getByIdComplaint),
  setCheckedComplaint: controllerWrapper(setCheckedComplaint),
  deleteComplaints: controllerWrapper(deleteComplaints),
};
