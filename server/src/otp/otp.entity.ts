import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { OtpType } from './otp.types';
@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, {nullable:true})
  @JoinColumn()
  user!: User;

  @Column({
    type: 'enum',
    enum: OtpType,
    default: OtpType.Verification,
  })
  otp_type!: OtpType;

  @Column()
  expires_at!: Date;

  @Column()
  code!: string;
}
