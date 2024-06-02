import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

export enum OtpType {
  Verification = 'verification',
  ChangePassword = 'changePassword',
  Discord = 'discord',
}

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ type: 'enum', enum: OtpType, default: OtpType.Verification })
  otp_type!: OtpType;

  @Column()
  expires_at!: Date;

  @Column()
  code!: string;

  @ManyToOne(() => User, (user) => user.otps)
  user!: User;
}
