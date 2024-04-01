import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentación de la Aplicación')
    .setDescription('Esto es para Desarrollo de Aplicaciones Web')
    .setVersion('1.0')
    .addTag('items')
    .addTag ('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);



  await app.listen(3000);
}
bootstrap();
