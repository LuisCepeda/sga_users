import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  const config = new DocumentBuilder()
    .setTitle('SGA users API')
    .setDescription('API para controlar los usuarios.')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/documentation', app, document)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const PORT = process.env.PORT || 3001
  app.enableCors();
  await app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
bootstrap();
