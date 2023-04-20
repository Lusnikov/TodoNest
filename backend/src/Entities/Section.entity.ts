import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";
import { Todo } from "./Todo.entity";


@Entity()
export class Section{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToOne(() => User, (e) => e.sections)
    user: User

    @OneToMany(() => Todo, (e) => e.section)
    todos: Todo[]

  
}