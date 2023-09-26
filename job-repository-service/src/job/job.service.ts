import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Repository } from 'typeorm';
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
    const jobEntities:Array<JobEntity> = await this.jobRepository.find();
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

  async updateEmailSentCount(jobDto:JobDto): Promise<void> {
    await this.jobRepository.manager.transaction(async (transactionalEntityManager) => {
        const jobEntity:JobEntity = await this.jobRepository.findOneBy({jobId:jobDto.jobId});
        if(!jobEntity) {
          return;
        }
        await transactionalEntityManager.createQueryBuilder().update(jobEntity).set({
            numOfEmailsSentSoFar: () =>("numOfEmailsSentSoFar + 1"),
        }).where("jobId = :id", { jobId: jobEntity.jobId }).execute()
    });
  }
}
