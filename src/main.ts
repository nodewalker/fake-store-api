import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './utils/Config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const port: number = Config.SERVER.PORT;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await app.listen(port).then(() => console.log(`Server start on: ${port}`));
}

bootstrap();
