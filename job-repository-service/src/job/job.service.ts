import { Inject, Injectable } from '@nestjs/common';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
    constructor(
        @Inject('JOB_REPOSITORY')
        private jobRepository: Repository<Job>,
      ) {}
    
      async findAll(): Promise<Array<Job>> {
        return this.jobRepository.find();
      }

      async findByJobId(jobId:string): Promise<Job> {
        return this.jobRepository.findOneBy({jobId});
      }

      async save(job:Job): Promise<Job> {
        return this.jobRepository.save(job);
      }

      async update(job:Job): Promise<void> {
        await this.jobRepository.manager.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.createQueryBuilder().update(job).set({
                numOfEmailsSentSoFar: () =>("numOfEmailsSentSoFar + 1"),
            }).where("jobId = :id", { jobId: job.jobId }).execute()
        });
      }

      async delete(job:Job): Promise<Job> {
        return this.jobRepository.remove(job);
      }
}
