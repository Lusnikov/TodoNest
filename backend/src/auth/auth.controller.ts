import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('/registration')
    async registration(){
        return 'registration'
    }

    @Post('/singIn')
    async signIn(){
        return 'signIn'
    }

    @Post('refresh')
    async refresh(){
        return 'refresh'
    }

}
