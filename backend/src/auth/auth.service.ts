import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async login(){

    }

    async registration(email: string, password: string){
        console.log('registration')
        const createdUser = await this.userService.createUser(email, password)

        return {
            accessToken: '',
        }
    }
}
