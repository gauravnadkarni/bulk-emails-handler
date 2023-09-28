import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Repository, UpdateResult } from 'typeorm';
import { Job as JobDto } from './dto/job.dto';
import { Job as JobEntity } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepository: Repository<JobEntity>,
  ) {}

  async findAllJobs(): Promise<Array<JobDto>> {
    const jobEntities:Array<JobEntity> = await this.jobRepository.find({
      order: {
          id: "DESC"
      }
    }); 
    if(!jobEntities || jobEntities.length===0) {
      return jobEntities;
    }
    const jobsDtos:Array<JobDto> = jobEntities.map((jobEntity:JobEntity):JobDto=>{
      return JobDto.fromEntity(jobEntity);
    });
    return jobsDtos;
  }

  async findByJobId(jobId:string): Promise<JobDto> {
    const jobEntity:JobEntity = await this.jobRepository.findOneBy({jobId});
    if(!jobEntity) {
      return jobEntity;
    }
    return JobDto.fromEntity(jobEntity);
  }

  async addNewJob(jobDto:JobDto): Promise<JobDto> {
    let jobEntity:JobEntity = JobDto.toEntity(jobDto);
    jobEntity = await this.jobRepository.save(jobEntity);
    return JobDto.fromEntity(jobEntity);
  }

  async updateJobStatusById(jobDto:JobDto): Promise<JobDto> {
    let jobEntity:JobEntity = await this.jobRepository.findOneBy({jobId:jobDto.jobId})
    const updatedJob:UpdateResult = await this.jobRepository.update(jobEntity.id!, {status:jobDto.status, isDone:jobDto.isDone});
    return await this.jobRepository.findOneBy({jobId:jobDto.jobId})
  }

  async updateEmailSentCount(jobDto:JobDto): Promise<void> {
    await this.jobRepository.manager.transaction(async (transactionalEntityManager) => {
        const jobEntity:JobEntity = await this.jobRepository.findOneBy({jobId:jobDto.jobId});
        if(!jobEntity) {
          return;
        }
        await this.jobRepository.createQueryBuilder().update(jobEntity).set({
            status: jobDto.status,
            numOfEmailsSentSoFar: () =>("numOfEmailsSentSoFar + 1"),
        }).where("id=:id",{id: jobEntity.id}).execute();
    });
  }
}
