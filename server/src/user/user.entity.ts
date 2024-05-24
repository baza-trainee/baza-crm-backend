import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from '../tag/tag.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @ManyToMany(() => Tag, tag => tag.users)
  @JoinTable()
  tags!: Tag[];

  @ManyToMany(() => Tag, tag => tag.specializedUsers)
  @JoinTable()
  specializations!: Tag[];

  @ManyToMany(() => Tag, tag => tag.technologies)
  @JoinTable()
  technologies!: Tag[];
}
