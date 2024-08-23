import { NextFunction, Request, Response } from 'express';
import controllerWrapper from '../../decorators/controller-wrapper';
import * as projectAplicationService from './project-aplication.service';

const createProjectAplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId, tagId } = req.params;
  await projectAplicationService.createProjectApplication(
    { projectId: Number(projectId), tagId: Number(tagId) },
    req.getUserId(),
  );
  res.json({ status: true });
};
const getProjectAplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const aplications = await projectAplicationService.getProjectAplications(
    Number(projectId),
  );
  res.json(aplications);
};
const resolveProjectAplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { aplicationId, status } = req.body;
  const { projectId } = req.params;
  await projectAplicationService.resolveProjectAplication({
    aplicationId: Number(aplicationId),
    projectId: Number(projectId),
    status,
  });
  res.json({ status: true });
};

export default {
  createProjectAplication: controllerWrapper(createProjectAplication),
  resolveProjectAplication: controllerWrapper(resolveProjectAplication),
  getProjectAplication: controllerWrapper(getProjectAplication),
};
