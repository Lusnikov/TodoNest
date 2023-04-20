import { Module } from '@nestjs/common';
import { TokenServiceService } from './token-service.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
          
        })
    ],
    providers: [TokenServiceService, ],
    exports: [TokenServiceService]
})
export class TokenServiceModule {}
