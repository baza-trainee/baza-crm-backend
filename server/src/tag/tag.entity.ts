import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    color!: string;

    @Column()
    isSpecialization!: boolean;
}
