import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TokenServiceModule } from 'src/token-service/token-service.module';


@Module({
  imports: [UserModule, TokenServiceModule],
  providers: [AuthService,  ],
  controllers: [AuthController]
})

export class AuthModule {}
