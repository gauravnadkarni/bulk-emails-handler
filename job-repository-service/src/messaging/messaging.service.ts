import { AmqpConnection, Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'src/job/dto/job.dto';
import { JobService } from 'src/job/job.service';

@Injectable()
export class MessagingService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly jobService:JobService, 
        private readonly eventEmitter: EventEmitter2
    ){}

    @RabbitRPC({
        exchange: 'x.direct',
        routingKey: 'route.job.create',
        queue: 'q.jobCreator'
    })
    async readNewJobCreatedMessage(jobData:Job){
        try{
            await this.jobService.addNewJob(jobData);
            await this.eventEmitter.emit("job.created", jobData);
            this.pushMessageForSendingNotifications(jobData);
            return new Nack();  //positivly ack
        } catch(err) {
            return new Nack(true);  //requeue
        }
    }

    async pushMessageForSendingNotifications(job:Job):Promise<void> {
        await this.amqpConnection.publish<Job>('x.direct','route.email.process',job);
    }

    @RabbitRPC({
        exchange: 'x.direct',
        routingKey: 'route.email.update',
        queue: 'q.emailUpdateProcessor'
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
        await this.amqpConnection.publish<Job>('x.fanout',"",job);
    }

    @RabbitRPC({
        exchange: 'x.fanout',
        routingKey: "",
        queue: 'q.updateStreamer'
    })
    async readStreamingJobMessage(jobData:Job){
        this.eventEmitter.emit("job.updated",jobData);
        return new Nack();
    }
}
