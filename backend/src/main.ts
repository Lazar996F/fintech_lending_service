import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(express()),
  );

  // Enable CORS for all origins
  app.enableCors();

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Landing Service API')
    .setDescription('Financial app that enable users to lend and borrow money')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/docs`, app, document);

  await app.listen(5000);
}
bootstrap();
