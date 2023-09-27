import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { CreateJobDto } from './dto/create-job.dto';
import Job from './dto/job.dto';

@Injectable()
export class JobsService {
    createJob(createJobDto: CreateJobDto):Job {
        const uuid = uuidv4();
        return {
            jobId: uuid,
            numOfEmailsToBeSent: createJobDto.numOfEmailsToBeSent,
            numOfEmailsSentSoFar: 0,
            status: 'initiating',
            isDone:false,
        }
    }
}
