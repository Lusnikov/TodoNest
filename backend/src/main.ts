import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { ErrorFilter } from './middlewares/Error.middleware';
import * as cookieParser from 'cookie-parser';

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter())
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true
  })
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
