import { AmqpConnection, Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'src/job/dto/job.dto';
import { JobService } from 'src/job/job.service';

@Injectable()
export class MessagingService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly jobService:JobService, 
        private readonly eventEmitter: EventEmitter2,
        private readonly configService:ConfigService,
    ){}

    @RabbitRPC({
        exchange: process.env.QUEUE_DIRECT_EXCHANGE_NAME,
        routingKey: process.env.QUEUE_EXCHANGE_ROUTE_JOB_CREATE,
        queue: process.env.QUEUE_NAME_JOB_CREATOR
    })
    async readNewJobCreatedMessage(jobData:Job){
        const jobCreatedEvent = this.configService.get("EMITTER_JOB_CREATED_EVENT");
        try{
            await this.jobService.addNewJob(jobData);
            await this.eventEmitter.emit(jobCreatedEvent, jobData);
            this.pushMessageForSendingNotifications(jobData);
            return new Nack();  //positivly ack
        } catch(err) {
            return new Nack(true);  //requeue
        }
    }

    async pushMessageForSendingNotifications(job:Job):Promise<void> {
        const directExchangeName = this.configService.get("QUEUE_DIRECT_EXCHANGE_NAME");
        const routeEmailProcess = this.configService.get("QUEUE_EXCHANGE_ROUTE_EMAIL_PROCESS");
        await this.amqpConnection.publish<Job>(directExchangeName,routeEmailProcess,job);
    }

    @RabbitRPC({
        exchange: process.env.QUEUE_DIRECT_EXCHANGE_NAME,
        routingKey: process.env.QUEUE_EXCHANGE_ROUTE_EMAIL_UPDATE,
        queue: process.env.QUEUE_NAME_EMAIL_UPDATE_PROCESSOR
    })
    async readJobUpdatedMessage(jobData:Job){
        try{
            //put updates in the database
            if(jobData.isDone!==true){
                //increment count emails sent so far
                await this.jobService.updateEmailSentCount(jobData);
            } else {
                //is extra closing message
                //update status and isDone without incrementing the emailSentSoFar field
                await this.jobService.updateJobStatusById(jobData);
            }
            const job:Job = await this.jobService.findByJobId(jobData.jobId);
            this.fanOutJobUpdateMessage(job);
            return new Nack();  //positivly ack
        } catch(err) {
            return new Nack(true);  //requeue
        }
    }

    async fanOutJobUpdateMessage(job:Job):Promise<void> {
        const fanoutExchangeName = this.configService.get("QUEUE_FANOUT_EXCHANGE_NAME");
        await this.amqpConnection.publish<Job>(fanoutExchangeName,"",job);
    }

    @RabbitRPC({
        exchange: process.env.QUEUE_FANOUT_EXCHANGE_NAME,
        routingKey: "",
        queue: process.env.QUEUE_NAME_UPDATE_STREAMER
    })
    async readStreamingJobMessage(jobData:Job){
        const jobUpdatedEvent = this.configService.get("EMITTER_JOB_UPDATED_EVENT");
        this.eventEmitter.emit(jobUpdatedEvent,jobData);
        return new Nack();
    }
}
