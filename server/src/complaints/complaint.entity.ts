import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Complaints {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  text!: string;

  @Column({ default: false })
  isChecked?: boolean;
}
