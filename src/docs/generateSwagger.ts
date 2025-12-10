import { NestFactory, NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { LoggerInstance } from 'src/logger';
import { AppModule } from './app.module';
import * as fs from 'fs';

export function swaggerDocumentInit(app: NestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Fake Store API')
    .setDescription(
      'A simple REST API that simulates an online store — provides fake products, categories, and users for testing, prototyping, and learning purposes.',
    )
    .setVersion('1.0')
    .setContact(
      'Smirnov Evgeny',
      'https://smirnov-portfolio.ru',
      'nodewalker@yandex.com',
    )
    .addBearerAuth()
    .addServer('https://fakestoreapi.ru')
    .build();
  return SwaggerModule.createDocument(app, config);
}

async function generateSwagger() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: WinstonModule.createLogger(LoggerInstance),
  });

  const document = swaggerDocumentInit(app);

  if (!fs.existsSync('./swagger')) fs.mkdirSync('./swagger');
  fs.writeFileSync('./swagger/swagger.json', JSON.stringify(document, null, 2));
  await app.close();
}

void generateSwagger();
