import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs boilerplate')
    .setDescription(
      'This setup will ensure nestjs boilerplate. Where you can find jwt token, authguard, swagger, typeorm, sitemap, relationship with some table example and more.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'token', // Name for the auth scheme
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keep auth token after page reload
    },
  });

  // Enable CORS with options
  const allowedOrigins = [
    'http://localhost:3002',
    'http://localhost:3000',
    'http://localhost:3005',
    'http://localhost:3001',
  ];

  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
