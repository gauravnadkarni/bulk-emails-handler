import { DataSource } from 'typeorm';
import {Job} from '../entities/job.entity';

export const jobProviders = [
  {
    provide: process.env.JOB_REPOSITORY_IDENTIFIER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Job),
    inject: [process.env.DATASOURCE],
  },
];
