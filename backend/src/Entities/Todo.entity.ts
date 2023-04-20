import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";
import { Section } from "./Section.entity";

@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: () => "NOW()"})
    dateCreated: Date

    @Column({ default: null })
    dateEnded?: Date;

    @Column({nullable: false, length: 128,})
    title: string

    @Column({nullable: false, type: "text"})
    content: string

    @Column({default: false})
    completed: boolean

    @ManyToOne(() => User, (e) => e.todos)
    user: User

    @ManyToOne(() => Section, (e) => e.todos, {eager: true})
    section: Section

}