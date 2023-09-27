import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { JobModule } from '../job/job.module';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: "store_connection",
      exchanges: [
        {
          name: 'x.direct',
          type: 'direct',
        },
      ],
      uri:  'amqp://jobstore:Pass123@backend-queue:5672',
      connectionInitOptions: { wait: false },
    }),
    JobModule
  ],
  providers: [MessagingService],
  exports:[MessagingService],
})
export class MessagingModule {}


