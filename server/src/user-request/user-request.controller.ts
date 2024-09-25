import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as userRequestService from './user-request.service';

const createUserRequest = async (req: Request, res: Response) => {
  await userRequestService.createUserRequest(req.body);
  res.json({ status: true });
};

const resolveUserRequest = async (req: Request, res: Response) => {
  await userRequestService.resolveUserRequest(
    Number(req.params.requestId),
    req.body.accepted,
  );
  res.json({ status: true });
};

const getAllRequest = async (req: Request, res: Response) => {
  const requests = await userRequestService.getAll(
    Number(req.query.skip),
    Boolean(req.query.resolved),
  );
  res.json(requests);
};

const getById = async (req: Request, res: Response) => {
  const request = await userRequestService.getById(
    Number(req.params.requestId),
  );
  res.json(request);
};

const resendInvite = async (req: Request, res: Response) => {
  await userRequestService.resendInvite(req.body.email);
  res.json({ status: true });
};

export default {
  createUserRequest: controllerWrapper(createUserRequest),
  resolveUserRequest: controllerWrapper(resolveUserRequest),
  getAllRequest: controllerWrapper(getAllRequest),
  getById: controllerWrapper(getById),
  resendInvite: controllerWrapper(resendInvite),
};
