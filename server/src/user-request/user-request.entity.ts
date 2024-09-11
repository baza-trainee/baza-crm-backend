import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ICreateUserRequest } from './user-request.types';

@Entity()
export class UserRequest implements ICreateUserRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  linkedin!: string;

  @Column()
  specialization!: string;

  @Column()
  discord!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  country!: string;

  @Column()
  city!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  isAccepted!: boolean;

  @Column({ nullable: true })
  expired_At!: Date;

  @Column({ nullable: true })
  created_at!: Date;
}
