import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { join } from "path";
import { AuthGuard } from './shared/guards/auth.guard';
import { PrismaService } from './shared/prisma';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Global auth guard
  const reflector = app.get(Reflector);
  const prismaService = app.get(PrismaService);
  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new AuthGuard(jwtService, prismaService, reflector));

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const apiVersion = process.env.npm_package_version || '1.0';
  const config = new DocumentBuilder()
    .setTitle('JobPrep Backend API')
    .setDescription('Plateforme IA de préparation aux entretiens')
    .setVersion(apiVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`🏥 Health Check: http://localhost:${port}/health`);
  logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  logger.log(`🧾 API Docs JSON: http://localhost:${port}/api/docs-json`);
}

bootstrap();
