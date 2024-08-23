import { ProjectTypes } from './project.enums';

export interface IProjectCreate {
  name: string;
  description: string;
  projectPoints: number;
  projectType: ProjectTypes;
  price: number;
}

export interface IProjectUpdate {
  name: string;
  description: string;
  projectPoints: number;
  projectType: ProjectTypes;
  price: number;
  site: string;
  dateTeam: string;
  dateStart: string;
}
