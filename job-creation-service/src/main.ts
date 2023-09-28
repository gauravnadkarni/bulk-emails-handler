import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));
  const configService: ConfigService= app.get(ConfigService);
  await app.listen(configService.get("APP_PORT"));
}
bootstrap();
