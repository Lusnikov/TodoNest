import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SAULT, UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { TokenServiceService } from 'src/token-service/token-service.service';
import { ClientUserData } from 'types/types';
import { UserDto } from 'src/dto/User.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenServiceService
    ){}

    async login(signInDto: SignInDto){
        // Проверить аккаунт на статус активации
        // Найти пользователя 
        const {email, password} = signInDto
        const user = await this.userService.getUserBy('email', email)
        if ( !user ) throw new UnauthorizedException({code: 1})
        if ( !bcrypt.compareSync(password, user.password) )  throw new UnauthorizedException({code: 1})
        if ( !user.activationStatus )  throw new UnauthorizedException({code: 2})

        const userDto = new UserDto(user).toClientDto()

        return {
            ...this.tokenService.generateAccessRefresh(userDto),
            userData: userDto,
        }
        
 
    }

    async registration(email: string, password: string){
        const createdUser = await this.userService.createUser(email, password)
        return 'Регистрация успешна';
    }

    async activateAccount(link: string){
      const {user} = await this.userService.getUserByLink(link)
      user.activationStatus = true
      await this.userService.updateUserModel(user)
      await this.userService.clearActivationLink(user)
    }

    
}
