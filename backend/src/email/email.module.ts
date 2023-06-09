import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from 'src/Entities/Email.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Email
    ])],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule {}
