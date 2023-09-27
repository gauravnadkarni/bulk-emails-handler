import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: "creator_connection",
      exchanges: [
        {
          name: 'x.direct',
          type: 'direct',
        },
      ],
      uri:  'amqp://jobcreator:Pass123@backend-queue:5672',
      connectionInitOptions: { wait: false },
    })
  ],
  providers: [MessagingService],
  exports:[MessagingService],
})
export class MessagingModule {}


