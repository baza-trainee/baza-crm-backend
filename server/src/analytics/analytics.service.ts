import { Project } from '../project/project.entity';
import { AppDataSource } from '../db/data-source';
import { User } from '../user/user.entity';
import { And, In, LessThanOrEqual, MoreThanOrEqual, Or } from 'typeorm';

const userRepository = AppDataSource.getRepository(User);
const projectRepository = AppDataSource.getRepository(Project);

export const getUserAnalytics = async (options: any) => {
  const query: any = {};
  if (options.from && options.to) {
    query.registerAt = And(
      LessThanOrEqual(options.to),
      MoreThanOrEqual(options.from),
    );
  }
  if (Array.isArray(options.technologies)) {
    query.technologies = {};
    query.technologies.id = In(options.technologies);
  }
  if (Array.isArray(options.specializations)) {
    query.specializations = {};
    query.specializations.id = In(options.specializations);
  }
  if (Array.isArray(options.statuses)) {
    query.status = Or(...options.statuses);
  }
  const result = await userRepository.findAndCount({
    where: query,
    relations: { technologies: true, specializations: true },
  });
  return result;
};

export const getProjectAnalytics = async (options: any) => {
  const query: any = {};
  if (Array.isArray(options.statuses)) {
    query.projectStatus = Or(...options.statuses);
  }
  if (Array.isArray(options.formats)) {
    query.projectType = Or(...options.formats);
  }
  const result = await projectRepository.findAndCount({
    where: query,
  });
  return result;
};
