import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ default: true })
  emailReceiving?: boolean;
}
