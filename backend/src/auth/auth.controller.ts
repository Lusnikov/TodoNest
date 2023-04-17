import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ){

    }
    @Post('/registration')
    async registration(@Body() registrationDto: RegistrationDto){
        const {email, password} = registrationDto
        await this.authService.registration(email, password)
        return 'registration'
    }

    @Post('/singIn')
    async signIn(@Body() signInDto: SignInDto){
        return 'signIn'
    }

    @Post('refresh')
    async refresh(){
        return 'refresh'
    }

    @Get('activate/:link')
    async activate(@Param('link') link: string){
        return link
    }

}
