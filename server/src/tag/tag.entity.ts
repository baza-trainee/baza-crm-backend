import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectRequirment } from '../project/requirment/project-requirment.entity';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  color!: string;

  @Column()
  isSpecialization!: boolean;
  @OneToMany(
    () => ProjectRequirment,
    (projectRequirment) => projectRequirment.project,
  )
  projectRequirments!: ProjectRequirment[];
}
