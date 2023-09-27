import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import Job from 'src/jobs/dto/job.dto';

@Injectable()
export class MessagingService {
    constructor(private readonly amqpConnection: AmqpConnection){}

    async pushMessage(job:Job):Promise<void> {
        await this.amqpConnection.publish<Job>('x.direct','route.job.create',job);
    }
}
