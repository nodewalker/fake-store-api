import { LoggerInstance } from './logger';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './utils/Config';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import { AllExceptionsFilter } from './utils/exception.filter';
import { CustomValidationPipe } from './utils/validation.pipe';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: WinstonModule.createLogger(LoggerInstance),
  });
  const port: number = Config.SERVER.PORT;
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
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

  await app.listen(port).then(() => console.log(`Server start on: ${port}`));
}

void bootstrap();
