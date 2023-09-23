import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'character varying', length: 500 })
  jobId: string;

  @Column('bigint')
  numOfEmailsToBeSent: bigint;

  @Column('bigint')
  numOfEmailsSentSoFar: bigint;

  @Column({type:'character varying', length: 10 })
  status: string;

  @Column({type:'boolean', default:false})
  isDone: boolean;
}