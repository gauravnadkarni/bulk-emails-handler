import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import Job from './dto/job.dto';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { MessagingService } from 'src/messaging/messaging.service';

@Controller('jobs')
export class JobsController {

    constructor(private jobsService:JobsService,private messagingService:MessagingService) {}
    
    @Post()
    async createJob(@Body() jobDto: CreateJobDto): Promise<Job> {
        try{
            const job:Job = this.jobsService.createJob(jobDto);
            console.log(job)
            await this.messagingService.pushMessage(job);
            return job
        } catch(err) {
            throw new HttpException('Facing issue as the required service is down', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
