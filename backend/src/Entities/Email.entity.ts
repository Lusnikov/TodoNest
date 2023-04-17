import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Email{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dateSended: Date

    @Column()
    email: string
}