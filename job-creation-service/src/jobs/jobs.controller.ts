import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import Job from './interfaces/job.intrface';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { MessagingService } from 'src/messaging/messaging.service';

@Controller('jobs')
export class JobsController {

    constructor(private jobService:JobsService, private messagingService:MessagingService) {}
    
    @Post()
    async createJob(@Body() jobDto: CreateJobDto): Promise<Job> {
        try{
            const job = this.jobService.createJob(jobDto);
            await this.messagingService.pushMessage(job);
            return job;
        } catch(err) {
            throw new HttpException('Facing issue as the required service is down', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
