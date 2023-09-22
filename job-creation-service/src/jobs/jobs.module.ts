import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  providers: [JobsService],
  imports: [MessagingModule],
})
export class JobsModule {}
