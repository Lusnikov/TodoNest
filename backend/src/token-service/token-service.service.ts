import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class TokenServiceService {
    constructor(
        private jwtService: JwtService
      ) {}
    
    generateToken<T extends string | object | Buffer>(payload: T, options?: JwtSignOptions){
        return this.jwtService.sign(payload, options)
    }

    generateAccessRefresh(payload: any): GenerateAccessRefresh{
        return {
            accessToken:   this.generateToken(payload, {expiresIn: '10m', secret: process.env.JWT_SALT_ACCESS}),
            refreshToken:  this.generateToken(payload, {expiresIn: '1h', secret: process.env.JWT_SALT_REFRESH}),
        }
    }

    validateToken(token: string){

    }
}
