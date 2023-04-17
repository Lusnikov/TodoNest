import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async login(){
        // Проверить аккаунт на статус активации

    }

    async registration(email: string, password: string){
        console.log('registration')
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
