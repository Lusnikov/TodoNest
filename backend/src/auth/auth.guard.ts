import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenServiceService } from 'src/token-service/token-service.service';
import { ClientUserData } from 'types/types';
import { AuthService } from './auth.service';



@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private tokenService: TokenServiceService,
        private authService: AuthService
    ){}

  async canActivate(context: ExecutionContext) {
    const obj = context.switchToHttp()
    const request = obj.getRequest()

    if (!request.headers || !request.headers.authorization ) throw new UnauthorizedException({ code: 10})

    const accessToken: string = request.headers?.authorization.replace('Bearer ', '')  
    if (!accessToken) throw new UnauthorizedException()
    const userData = this.tokenService.validateToken(accessToken, process.env.JWT_SALT_ACCESS) as ClientUserData
    request.userData = userData
    return true
  }
}
