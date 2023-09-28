import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobController } from './job/job.controller';
import { ConfigModule } from '@nestjs/config';
import {JobModule} from './job/job.module';
import {dataSourceOptions} from './config/typeorm.config';
import { JobService } from './job/job.service';
import { DataSource } from 'typeorm';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { GatewayModule } from './gateway/gateway.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRoot(dataSourceOptions),
    EventEmitterModule.forRoot(),
    JobModule,
    MessagingModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}