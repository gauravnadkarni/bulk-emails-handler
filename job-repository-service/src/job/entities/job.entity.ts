import { table } from 'console';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({type:'varchar', length: 500 })
  jobId: string;

  @Column('bigint')
  numOfEmailsToBeSent: bigint;

  @Column('bigint')
  numOfEmailsSentSoFar: bigint;

  @Column({type:'varchar', length: 10 })
  status: string;

  @Column({type:'boolean', default:false})
  isDone: boolean;
}