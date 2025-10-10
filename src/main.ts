import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './utils/Config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Config.SERVER.PORT);
}

bootstrap();
