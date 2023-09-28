import { Module } from '@nestjs/common';
import { JobsController } from './jobs/jobs.controller';
import { JobsModule } from './jobs/jobs.module';
import { MessagingService } from './messaging/messaging.service';
import { MessagingModule } from './messaging/messaging.module';
import { JobsService } from './jobs/jobs.service';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagingModule,
    JobsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 
