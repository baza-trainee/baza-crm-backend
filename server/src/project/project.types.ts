import { ProjectTypes } from './project.enums';

export interface IProjectCreate {
  name: string;
  description: string;
  projectPoints: number;
  projectType: ProjectTypes;
  price: number;
  dateStart: string;
  dateTeam: string;
}

export interface IProjectUpdate {
  name: string;
  description: string;
  projectPoints: number;
  projectType: ProjectTypes;
  price: number;
  dateTeam: string;
  dateStart: string;
  links: string[];
}
