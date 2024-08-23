import { AppDataSource } from '../../db/data-source';
import { ProjectRequirment } from './project-requirment.entity';
import {
  IProjectRequirmentDeleteDto,
  IProjectRequirmentDto,
} from './project-requirment.types';

const projectRequirmentRepositroy =
  AppDataSource.getRepository(ProjectRequirment);

export const createProjectRequirment = async (
  projectRequirmentDto: IProjectRequirmentDto,
) => {
  const requirment = await projectRequirmentRepositroy.create(
    projectRequirmentDto,
  );
  await projectRequirmentRepositroy.save(requirment);
};
export const deleteProjectRequirment = async (
  projectDeleteDto: IProjectRequirmentDeleteDto,
) => {
  const result = await projectRequirmentRepositroy.delete(projectDeleteDto);
  return Boolean(result.affected);
};

export const editProjectRequirment = async (
  projectRequirmentDto: IProjectRequirmentDto,
) => {
  const result = await projectRequirmentRepositroy.update(
    {
      projectId: projectRequirmentDto.projectId,
      tagId: projectRequirmentDto.tagId,
    },
    { count: projectRequirmentDto.count },
  );
  return Boolean(result.affected);
};
