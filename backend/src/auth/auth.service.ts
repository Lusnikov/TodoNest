import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async login(signInDto: SignInDto){
        // Проверить аккаунт на статус активации
        // Найти пользователя 
        const {email, password} = signInDto
        this.userService.getUserBy('email', '')
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
