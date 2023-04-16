import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    avatarUrl: string
}