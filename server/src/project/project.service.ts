import { AppDataSource } from '../db/data-source';
import { Project } from './project.entity';
import { ProjectStatuses } from './project.enums';
import { IProjectCreate, IProjectUpdate } from './project.types';

const projectRepository = AppDataSource.getRepository(Project);

export const findAllPojects = async () => {
  // TODO add caching
  const projects = await projectRepository.find();
  return projects;
};

export const findProjectById = async (id: number) => {
  const project = await projectRepository.findOne({ where: { id } });
  if (project === null) throw new Error('Project not found');
  return project;
};

export const createProject = async (createProjectDto: IProjectCreate) => {
  const newProject = await projectRepository.create(createProjectDto);
  await projectRepository.save(newProject);
  return newProject.id;
};

export const updateProject = async (
  id: number,
  updateProjectDto: IProjectUpdate,
) => {
  await findProjectById(id);
  await projectRepository.update({ id }, updateProjectDto);
  return await findProjectById(id);
};

export const updateProjectStatus = async (
  id: number,
  status: ProjectStatuses,
) => {
  await findProjectById(id);
  await projectRepository.update({ id }, { projectStatus: status });
  /* TODO custom logic for change status */
  return await findProjectById(id);
};
