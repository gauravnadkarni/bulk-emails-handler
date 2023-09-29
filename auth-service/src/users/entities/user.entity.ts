import { table } from 'console';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({type:'varchar', length: 500 })
  userId: string;

  @Column({type:'varchar', length: 300 })
  email: string;

  @Column({type:'varchar', length: 800 })
  password: string;

  @Column({type:'varchar', length: 500 })
  name: string;
}