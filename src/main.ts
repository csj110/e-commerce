import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:4200', // angular
      'http://localhost:3000', // react
      'http://localhost:8081' // react-native
    ]
  });
  await app.listen(4000);
  Logger.log('http://localhost:4000');
}
bootstrap();
