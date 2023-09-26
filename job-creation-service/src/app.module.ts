import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsController } from './jobs/jobs.controller';
import { JobsModule } from './jobs/jobs.module';
import { MessagingService } from './messaging/messaging.service';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [JobsModule, MessagingModule],
  controllers: [AppController, JobsController],
  providers: [AppService, MessagingService],
})
export class AppModule {}
