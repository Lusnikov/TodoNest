import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './Entities/UserEntity';
import { UserActivation } from './Entities/UserActivation.entity';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { Email } from './Entities/Email.entity';
import { TokenServiceService } from './token-service/token-service.service';
import { TokenServiceModule } from './token-service/token-service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'todos_nest',
      entities: [User, UserActivation, Email],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    EmailModule,
    TokenServiceModule
  ],
  controllers: [AppController],
  providers: [AppService, TokenServiceService],
})
export class AppModule {}
