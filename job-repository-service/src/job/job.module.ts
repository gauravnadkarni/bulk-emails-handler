import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Job]),EventEmitter2],
  exports: [TypeOrmModule,JobService],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
