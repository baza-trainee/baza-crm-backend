import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;
}
