import { Dayjs } from "dayjs";
import { Answer, Question, Theme, User, Test } from "src/db/entities";

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


@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt!: Dayjs;

  @ManyToOne(()=> Test, x=> x.results, {onDelete: 'CASCADE'})
  test!: Test; 

  @Column()
  testId!: number;

  @ManyToOne(()=> User, x=> x.results)
  user!: User; 

  @Column()
  userId!: number;

  // @OneToMany(()=> Question, x=> x.test)
  // questions!: Question; 
  @Column('float')
  percent!: number;

  constructor(from: Partial<Test>) {
    Object.assign(this, from);
  }
}
