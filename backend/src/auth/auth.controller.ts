import { Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivation } from 'src/Entities/UserActivation.entity';
import { Repository } from 'typeorm';
import { SignInResponse } from './types/types';
import { Request, Response } from 'express';
import { TokenServiceService } from 'src/token-service/token-service.service';
import { ClientUserData } from 'types/types';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/dto/User.dto';

@Controller('auth')
export class AuthController {
    constructor (
        private  authService: AuthService,
        private userService: UserService,
        private readonly tokenService: TokenServiceService
      

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
    async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response): SignInResponse{
        const refreshToken: string = req.cookies.refresh  ?? null
        if (!refreshToken) throw new UnauthorizedException()
        const userData = this.tokenService.validateToken(refreshToken, process.env.JWT_SALT_REFRESH) as ClientUserData
        await this.authService.refreshTokenExits(userData.id, refreshToken)

        const user = await this.userService.getUserBy('userId', userData.id)
        const clientData = new UserDto(user).toClientDto()

        const {accessToken, refreshToken:refTokenNew} = this.tokenService.generateAccessRefresh(clientData)
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        await this.authService.updateRefreshToken(user.userId, refTokenNew)
        res.cookie('refresh', refTokenNew, { httpOnly: true, expires: expires})
        
        return {
            accessToken: accessToken,
            userData: clientData
        }
    }

    @Get('activate/:link')
    async activate(@Param('link') link: string){
        await this.authService.activateAccount(link)
        return link
    }

}
