import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivation } from 'src/Entities/UserActivation.entity';
import { Repository } from 'typeorm';
import { SignInResponse } from './types/types';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor (
        private  authService: AuthService,
      

    ){

    }
    @Post('/registration')
    async registration(@Body() registrationDto: RegistrationDto){
        const {email, password} = registrationDto
        await this.authService.registration(email, password)
        return 'registration'
    }

    @Post('/singIn')
    async signIn(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: Response):SignInResponse{
        const {accessToken,refreshToken,userData} = await this.authService.login(signInDto)
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        res.cookie('refresh', refreshToken, { httpOnly: true, expires: expires})
        return {
            accessToken,
            userData
        }
    }
    @Post('refresh')
    async refresh(){
        return 'refresh'
    }

    @Get('activate/:link')
    async activate(@Param('link') link: string){
        await this.authService.activateAccount(link)
        return link
    }

}
