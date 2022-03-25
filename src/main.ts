import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Para que no nos envíen datos que no estén contemplados
  // en el DTO correspondiente ( datos maliciosos ),
  // enviamos opciones al ValidationPipe, en el caso
  // específico el whiteList a true va a quitar del
  // payload todo lo que no esté definido en el DTO.
  // Otra opción que podemos aplicar al ValidationPipes
  // es el   forbidNonWhitelisted, que permite indicar al
  // usuario que está enviando un atributo que no es
  // válido
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors(); // habilitar cors
  // para consumir desde
  // cualquier punto
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
