import { Module } from '@nestjs/common';
import { TokenServiceService } from './token-service.service';

@Module({
    providers: [TokenServiceService],
    exports: [TokenServiceService]
})
export class TokenServiceModule {}
