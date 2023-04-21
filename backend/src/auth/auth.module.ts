import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TokenServiceModule } from 'src/token-service/token-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/UserEntity';
import { JwtAuthGuard } from './auth.guard';
import { TokenServiceService } from 'src/token-service/token-service.service';


@Module({
  imports: [
    UserModule, 
    TokenServiceModule,
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [AuthService, JwtAuthGuard, TokenServiceService ],
  controllers: [AuthController, ],
  exports: [
    TokenServiceService,
    // JwtAuthGuard,
    AuthService
  ]

})

export class AuthModule {}
