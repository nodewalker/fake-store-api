import { NestFactory, NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { LoggerInstance } from 'src/logger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function generateSwagger() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: WinstonModule.createLogger(LoggerInstance),
  });
  const config = new DocumentBuilder()
    .setTitle('Fake Store API')
    .setDescription(
      'A simple REST API that simulates an online store — provides fake products, categories, and users for testing, prototyping, and learning purposes.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  if (!fs.existsSync('./swagger')) fs.mkdirSync('./swagger');
  fs.writeFileSync('./swagger/swagger.json', JSON.stringify(document, null, 2));
}

void generateSwagger();
