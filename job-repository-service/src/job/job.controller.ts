import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, MessageEvent, Res } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, interval, map } from 'rxjs';
import { Job as JobDto } from './dto/job.dto';
import NewJobEvent from './events/new-job.event';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService, private readonly eventEmitter: EventEmitter2) {}

    @Sse("sse")
    listenToUpdates():Observable<MessageEvent> {
        return fromEvent(this.eventEmitter, "email.sent")
          .pipe(map(job => {
              return { data: job } as MessageEvent;
          }));
    }

    @Post()
    async createJob(@Body() jobDto: JobDto):Promise<JobDto> {
      const dto:JobDto = await this.jobService.addNewJob(jobDto);
      this.eventEmitter.emit("email.sent", 
          new NewJobEvent(dto)
        ) 
      return dto;
    }

    @Get()
    async getAllJobs():Promise<Array<JobDto>> {
      const dtos:Array<JobDto> = await this.jobService.findAllJobs();
      return dtos;
    }

    @Patch()
    async update(@Body() jobDto: JobDto):Promise<JobDto> {
      await this.jobService.updateEmailSentCount(jobDto);
      const dto:JobDto =await this.jobService.findByJobId(jobDto.jobId);
      return dto;
    }
}
