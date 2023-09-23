import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobController } from './job/job.controller';
import { JobsModule } from './job/job.module';
import { DatabaseModule } from './database/database.module';
import appConfig from './config/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JobsModule, DatabaseModule,ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`,
    load:[appConfig],
  })],
  controllers: [AppController, JobController],
  providers: [AppService],
})
export class AppModule {}
