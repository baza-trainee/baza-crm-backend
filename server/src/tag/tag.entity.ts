import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
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
    is_specialization!: boolean;

    @ManyToMany(() => User, (user) => user.tags)
    users!: User[];
    
    @ManyToMany(() => User, user => user.specializations)
    specializedUsers!: User[];

    @ManyToMany(() => User, user => user.technologies)
    technologies!: User[];
}
