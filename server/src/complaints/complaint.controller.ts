import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as complaintService from './complaint.service';

const createComplaint = async (req: Request, res: Response) => {
  await complaintService.create(req.body);
  res.status(201).json('Created');
};

const getAllComplaints = async (req: Request, res: Response) => {
    const complaints = await complaintService.getAll();
    res.json(complaints)
};

const getByIdComplaint = async (req: Request, res: Response) => {
    const { id } = req.params;
    const complaints = await complaintService.getById(Number(id));
    res.json(complaints);
};

const setCheckedComplaint = async (req: Request, res: Response) => {};

const deleteComplaints = async (req: Request, res: Response) => {
  await complaintService.deleteItem(Number(req.params.id));
  res.status(200).json('Deleted');
};

export default {
    createComplaint: controllerWrapper(createComplaint),
    getAllComplaints: controllerWrapper(getAllComplaints),
    getByIdComplaint: controllerWrapper(getByIdComplaint),
    setCheckedComplaint: controllerWrapper(setCheckedComplaint),
    deleteComplaints:controllerWrapper(deleteComplaints),
};
