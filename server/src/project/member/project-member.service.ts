import { AppDataSource } from '../../db/data-source';
import { findTagById } from '../../tag/tag.service';
import { findUserById } from '../../user/user.service';
import { findProjectById } from '../project.service';
import { ProjectMember } from './project-member.entity';
import {
  IProjectMemberAddDto,
  IProjectMemberRemoveDto,
} from './project-member.types';

const projectMemberRepository = AppDataSource.getRepository(ProjectMember);

export const getProjectMembers = async (projectId: number) => {
  return await projectMemberRepository.find({ where: { projectId } });
};

export const addMemberToProject = async (dto: IProjectMemberAddDto) => {
  const project = await findProjectById(dto.projectId);
  const tag = await findTagById(dto.tagId);
  const user = await findUserById(dto.userId);
  const entity = await projectMemberRepository.findOne({
    where: { project, user },
  });
  if (entity) throw new Error('User already in project');
  const projectMember = await projectMemberRepository.create({
    project,
    tag,
    user,
  });
  await projectMemberRepository.save(projectMember);
};

export const removeMemberFromProject = async (dto: IProjectMemberRemoveDto) => {
  const project = await findProjectById(dto.projectId);
  const user = await findUserById(dto.userId);
  const projectMember = await projectMemberRepository.findOne({
    where: { project, user },
  });
  if (!projectMember) throw new Error('User do not belongs to this project');
  await projectMemberRepository.remove(projectMember);
};
