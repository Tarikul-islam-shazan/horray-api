import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const configService = new ConfigService();
    const port = configService.get('APP_PORT');
    const logger = new Logger();

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
    .setTitle('Hooray E-commerce API')
    .setDescription('Hooray E-commerce API')
    .setVersion('1.0')
    .addTag('hooray')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);


    await app.listen(port);

    logger.log(`"/src/main.ts", The server is running on Port: ${port}`);
  } catch (error) {
    this.logger.error(`"/src/main.ts", The server is not ruuning`, error.stack);
    throw new Error('Internal Server Error');
  }
}
bootstrap();
