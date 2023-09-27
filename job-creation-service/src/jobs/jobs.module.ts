import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { MessagingModule } from 'src/messaging/messaging.module';
import { JobsController } from './jobs.controller';

@Module({
  providers: [JobsService],
  controllers: [JobsController],
  imports: [MessagingModule],
})
export class JobsModule {}
