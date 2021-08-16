import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Adiciona o Pipe de forma Global na aplicação
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  // Permite que o NestJS inclua no container da aplicação o container paralelo do Class Validation
  // Isso permite que o class validation aceite as injeções de dependencias da aplicação
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
