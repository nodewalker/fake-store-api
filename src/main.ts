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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as widdershins from 'widdershins';

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

  // ! for docs generating
  // const config = new DocumentBuilder()
  //   .setTitle('Fake Store API')
  //   .setDescription(
  //     'A simple REST API that simulates an online store — provides fake products, categories, and users for testing, prototyping, and learning purposes.',
  //   )
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  // const markdown = await widdershins.convert(document, {
  //   codeSamples: true,
  //   httpsnippet: false,
  //   language_tabs: [{ javascript: 'JavaScript' }],
  //   tocSummary: true,
  // });
  // fs.writeFileSync('./docs/api.md', markdown);

  await app.listen(port).then(() => console.log(`Server start on: ${port}`));
}

void bootstrap();
