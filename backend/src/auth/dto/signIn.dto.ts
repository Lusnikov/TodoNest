import { IsEmail, Length } from "class-validator"


export class SignInDto{
    @IsEmail()
    email: string

    @Length(3, 20)
    password: string

}