import { NextFunction, Request, Response } from 'express';
import controllerWrapper from '../../decorators/controller-wrapper';
import * as projectMemberService from './project-member.service';
import { findByEmail } from '../../user/user.service';
const getProjectMembers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const members = await projectMemberService.getProjectMembers(
    Number(projectId),
  );
  res.json(members);
};

const removeMemberFromProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const { userId } = req.body;
  await projectMemberService.removeMemberFromProject({
    projectId: Number(projectId),
    userId: Number(userId),
  });
  res.json({ status: true });
};

const addMemberToProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const { tagId, email } = req.body;
  const user = await findByEmail(email);
  await projectMemberService.addMemberToProject({
    projectId: Number(projectId),
    tagId: Number(tagId),
    userId: Number(user.id),
  });
  res.json({ status: true });
};

export default {
  removeMemberFromProject: controllerWrapper(removeMemberFromProject),
  getProjectMembers: controllerWrapper(getProjectMembers),
  addMemberToProject: controllerWrapper(addMemberToProject),
};
