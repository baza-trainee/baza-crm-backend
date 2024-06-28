import { NextFunction, Request, Response } from 'express';
import controllerWrapper from '../../decorators/controller-wrapper';
import * as projectRequirmentService from './project-requirment.service';

projectRequirmentService.createProjectRequirment;
projectRequirmentService.deleteProjectRequirment;
projectRequirmentService.editProjectRequirment;

const createProjectRequirment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params } = req;
  const { count } = req.body;
  await projectRequirmentService.createProjectRequirment({
    count: Number(count),
    projectId: Number(params.projectId),
    tagId: Number(params.tagId),
  });
  res.json({ status: true });
};

const updateProjectRequirment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params } = req;
  const { count } = req.body;
  const result = await projectRequirmentService.editProjectRequirment({
    count: Number(count),
    projectId: Number(params.projectId),
    tagId: Number(params.tagId),
  });
  res.status(200).json({ status: result });
};

const deleteProjectRequirment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params } = req;
  const result = await projectRequirmentService.deleteProjectRequirment({
    projectId: Number(params.projectId),
    tagId: Number(params.tagId),
  });
  res.status(200).json({ status: result });
};

export default {
  deleteProjectRequirment: controllerWrapper(deleteProjectRequirment),
  createProjectRequirment: controllerWrapper(createProjectRequirment),
  updateProjectRequirment: controllerWrapper(updateProjectRequirment),
};
