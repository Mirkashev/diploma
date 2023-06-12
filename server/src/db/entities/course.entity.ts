import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })
    name: string;
    
    @Column({
        type: 'varchar',
        default: ''
    })
    description: string;

    @Column({
        type: 'varchar',
        default: 'Кафедра '
    })
    author: string;

    // @ManyToMany(type => User, {nullable: true})
    // @JoinTable()
    // author: User[];

}