import { IsEmail, Length, minLength } from "class-validator";



export class RegistrationDto{
    @IsEmail()
    email: string

    @Length(3, 20)
    password: string
}