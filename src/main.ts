import 'reflect-metadata';
import { LoggerInstance } from './logger';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import { AllExceptionsFilter } from './utils/exception.filter';
import { CustomValidationPipe } from './utils/validation.pipe';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: WinstonModule.createLogger(LoggerInstance),
  });
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('port') as number;
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/files/',
  });

  app.use((req, res, next) => {
    req.app.set('trust proxy', true);
    next();
  });
  app.use(helmet());
  app.enableCors({
    origin: true,
  });
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 100,
    }),
  );

  await app
    .listen(port, '0.0.0.0')
    .then(() => console.log(`Server start on: ${port}`));
}

void bootstrap();
