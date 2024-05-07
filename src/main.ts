import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SGA users API')
    .setDescription('API para controlar los usuarios.')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
