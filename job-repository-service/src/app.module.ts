import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobController } from './job/job.controller';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {JobModule} from './job/job.module';
import {dataSourceOptions} from './config/typeorm.config';
import { JobService } from './job/job.service';
import { DataSource } from 'typeorm';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRoot(dataSourceOptions),
    EventEmitterModule.forRoot(),
    JobModule,
    GatewayModule,
  ],
  controllers: [AppController, JobController],
  providers: [AppService, JobService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}