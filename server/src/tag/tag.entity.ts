import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectRequirment } from '../project/requirment/project-requirment.entity';
import { ProjectAplication } from '../project/aplication/project-aplication.entity';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  color!: string;

  @Column()
  isSpecialization!: boolean;
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
}
