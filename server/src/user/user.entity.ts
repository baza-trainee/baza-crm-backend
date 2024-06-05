import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Otp } from '../otp/otp.entity';

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

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  discord?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ default: true })
  emailReceiving?: boolean;

  @Column({ nullable: true, default: false })
  isVerified?: boolean;
}
