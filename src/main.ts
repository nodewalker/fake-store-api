import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './utils/Config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const port: number = Config.SERVER.PORT;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port).then(() => console.log(`Server start on: ${port}`));
}

bootstrap();
