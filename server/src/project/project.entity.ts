import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ProjectStatuses, ProjectTypes } from './project.enums';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
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

  @Column({ type: 'text', nullable: true })
  paymentInfo?: string;
}
