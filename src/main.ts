import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin:  [
    'http://localhost:3000',                 
    process.env.FRONTEND_URL,                   
  ],
    methods: ['GET', 'POST'],
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //ignora campos no declarados en DTOf
    forbidNonWhitelisted:true,  // lanza error si llegan campos extra
    transform:true, // convierte tipos automáticamente
  }))
  const config = new DocumentBuilder()
    .setTitle('API flores back')
    .setDescription('solo tests')
    .setVersion('1.0')
    .addTag('taaag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useLogger(['error', 'warn', 'log', 'debug', 'verbose']);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
