import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./Section.entity";
import { Todo } from "./Todo.entity";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: null})
    avatarUrl?: string

    @Column({default: false})
    activationStatus: Boolean

    @OneToMany(() => Section, (e) => e.user, {eager: true})
    sections: Section[]

    @OneToMany(() => Todo, (e) => e.user, {eager: true})
    todos: Todo[]
}