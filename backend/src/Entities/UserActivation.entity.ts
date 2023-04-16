import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity()
export class UserActivation{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    activationLink: string

    @ManyToOne(() => User)
    user: User
}