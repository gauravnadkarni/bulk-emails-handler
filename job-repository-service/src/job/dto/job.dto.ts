import {Job as JobEntity} from '../entities/job.entity';

export class Job {
    jobId: string;
    numOfEmailsToBeSent: bigint;
    numOfEmailsSentSoFar: bigint;
    status: string;
    isDone: boolean;

    static fromEntity(jobEntity:JobEntity):Job {
        const job:Job = new Job();
        job.jobId = jobEntity.jobId;
        job.numOfEmailsToBeSent = jobEntity.numOfEmailsToBeSent;
        job.numOfEmailsSentSoFar = jobEntity.numOfEmailsSentSoFar;
        job.status = jobEntity.status;
        job.isDone = jobEntity.isDone;
        return job;
    }

    static toEntity(jobDto:Job):Job {
        const job:Job = new JobEntity();
        job.jobId = jobDto.jobId;
        job.numOfEmailsToBeSent = jobDto.numOfEmailsToBeSent;
        job.numOfEmailsSentSoFar = jobDto.numOfEmailsSentSoFar;
        job.status = jobDto.status;
        job.isDone = jobDto.isDone;
        return job;
    }
}