import { ProjectAplicationState } from './project-aplication.enums';

export interface IProjectAplicationDto {
  projectId: number;
  tagId: number;
}

export interface IProjectAplicationResolveDto {
  projectId: number;
  aplicationId: number;
  status: ProjectAplicationState.ACCEPTED | ProjectAplicationState.DECLINED;
}
