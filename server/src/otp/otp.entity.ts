import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { verify } from 'crypto';

export enum OtpType {
  Verification = 'verification',
  ChangePassword = 'changePassword',
  Discord = 'discord',
}

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ type: 'enum', enum: OtpType, default: OtpType.Verification })
  otp_type!: string;

  @Column({ type: 'date' })
  expires_at!: string;

  @Column({ type: 'varchar', length: 6 })
  code?: string;
}
