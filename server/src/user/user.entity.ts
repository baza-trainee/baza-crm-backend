import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  technologies!: Tag[];

  @ManyToMany(() => Tag)
  @JoinTable()
  specializations!: Tag[];
}
