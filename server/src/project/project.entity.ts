import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectStatuses, ProjectTypes } from './project.enums';
import { ProjectRequirment } from './requirment/project-requirment.entity';
import { ProjectAplication } from './aplication/project-aplication.entity';
import { ProjectMember } from './member/project-member.entity';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  description!: string;

  @Column()
  projectPoints!: number;

  @Column({ enum: ProjectStatuses, default: ProjectStatuses.IN_SEARCH })
  projectStatus!: ProjectStatuses;

  @Column({ enum: ProjectTypes, default: ProjectTypes.FREE })
  projectType!: ProjectTypes;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  site?: string;

  @OneToMany(
    () => ProjectRequirment,
    (projectRequirment) => projectRequirment.project,
  )
  projectRequirments!: ProjectRequirment[];

  @OneToMany(
    () => ProjectAplication,
    (projectAplications) => projectAplications.project,
  )
  projectAplications!: ProjectAplication[];
  @OneToMany(() => ProjectMember, (projectMember) => projectMember.project)
  projectMember!: ProjectMember[];
}
