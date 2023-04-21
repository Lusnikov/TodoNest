import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ClientUserData } from 'types/types';

@Injectable()
export class TokenServiceService {
    constructor(
        private jwtService: JwtService
      ) {}
    
    generateToken<T extends string | object | Buffer>(payload: T, options?: JwtSignOptions){
        return this.jwtService.sign(payload, options)
    }

    generateAccessRefresh(payload: ClientUserData): GenerateAccessRefresh{
        return {
            accessToken:   this.generateToken(payload, {expiresIn: '1h', secret: process.env.JWT_SALT_ACCESS}),
            refreshToken:  this.generateToken(payload, {expiresIn: '1h', secret: process.env.JWT_SALT_REFRESH}),
        }
    }

    validateToken(token: string, salt: string){
        try{
            const returned = this.jwtService.verify(token, {secret: salt})
            return returned
        } catch(err){
             throw new UnauthorizedException()
        }
    }
}
