import { Module } from '@nestjs/common';
import { jobProviders } from './providers/job.providers';
import { ConfigModule } from '@nestjs/config';
import { JobServiceService } from './job.service/job.service.service';
import { JobsService } from './job.service';

@Module({
  providers: [jobProviders, JobServiceService, JobsService],
  imports:[ConfigModule]
})
export class JobsModule {}
