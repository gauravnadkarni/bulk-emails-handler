import { Injectable } from '@nestjs/common';
import Job from 'src/jobs/interfaces/job.intrface';

@Injectable()
export class MessagingService {
    async pushMessage(job:Job):Promise<void> {
        console.log("published the message to queue")
    }
}
