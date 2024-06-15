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

  @Column()
  linkedin?: string;

  @Column({ nullable: true })
  discord?: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  phone!: string;

  @Column()
  city!: string;

  @Column()
  country?: string;

  @Column({ default: true })
  emailReceiving?: boolean;
}
