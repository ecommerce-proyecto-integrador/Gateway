import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  
  const app2 = await NestFactory.create(AppModule);
  const PORT = 4000; 
  await app2.listen(PORT);
}
bootstrap();
