import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || (process.env.NODE_ENV === 'development' ? 5000 : 5001));
}
bootstrap();
