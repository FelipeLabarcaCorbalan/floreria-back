import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin:  [
    'http://localhost:3000',                 
    process.env.FRONTEND_URL,   
    process.env.FRONTEND_PROD,                 
  ],
    methods: ['GET', 'POST'],
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //ignora campos no declarados en DTOf
    forbidNonWhitelisted:true,  // lanza error si llegan campos extra
    transform:true, // convierte tipos automáticamente
  }))
  app.useLogger(['error', 'warn', 'log', 'debug', 'verbose']);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
