import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import Job from './interfaces/job.intrface';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
    createJob(createJobDto: CreateJobDto):Job {
        const uuid = uuidv4();
        return {
            jobId: uuid,
            numOfEmailsToBeSent: createJobDto.numberOfEmailsToBeSent,
            numOfEmailsSentSoFar:0,
            status: 'initiating',
        }
    }
}
