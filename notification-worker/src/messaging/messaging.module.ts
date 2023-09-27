import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: "worker_connection",
      exchanges: [
        {
          name: 'x.direct',
          type: 'direct',
        },
      ],
      uri:  'amqp://jobstore:Pass123@backend-queue:5672',
      connectionInitOptions: { wait: false },
    }),
    EmailModule,
  ],
  providers: [MessagingService],
  exports:[MessagingService],
})
export class MessagingModule {}


