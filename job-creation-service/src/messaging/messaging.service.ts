import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Job from 'src/jobs/dto/job.dto';

@Injectable()
export class MessagingService {
    constructor(private readonly amqpConnection: AmqpConnection, private readonly configService:ConfigService){}

    async pushMessage(job:Job):Promise<void> {
        const directExchangeName = this.configService.get("QUEUE_DIRECT_EXCHANGE_NAME");
        const routeJobCreate = this.configService.get("QUEUE_EXCHANGE_ROUTE_JOB_CREATE");

        await this.amqpConnection.publish<Job>(directExchangeName,routeJobCreate,job);
    }
}
