import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: process.env.QUEUE_CONNECTION_NAME,
      exchanges: [
        {
          name: process.env.QUEUE_DIRECT_EXCHANGE_NAME,
          type: 'direct',
        },
      ],
      uri: `amqp://${process.env.QUEUE_USERNAME}:${process.env.QUEUE_PASSWORD}@${process.env.QUEUE_SERVICE_NAME}:${process.env.QUEUE_PORT}`,
      connectionInitOptions: { wait: false },
    })
  ],
  providers: [MessagingService],
  exports:[MessagingService],
})
export class MessagingModule {}


