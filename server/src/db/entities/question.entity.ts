
// import { Test } from "@nestjs/testing";
import { Dayjs } from "dayjs";
import { Theme, Answer, Test } from "src/db/entities";

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('text')
  @Index()
  title!: string;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt!: Dayjs;

  @OneToMany(()=> Answer, x=> x.question, {cascade: true})
  answers!: Answer; 

  @ManyToOne(()=> Test, x=> x.questions)
  test!: Test; 

  @Column()
  testId!: number;

  constructor(from: Partial<Question>) {
    Object.assign(this, from);
  }
}
