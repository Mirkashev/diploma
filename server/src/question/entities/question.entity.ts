import { Answer } from 'src/answer/entities/answer.entity';
import { Test } from 'src/test/entities/test.entity';
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

  // @Column('timestamptz', {
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // @Index()
  // createdAt!: Dayjs;

  @OneToMany(()=> Answer, x=> x.question, {cascade: true})
  answers!: Answer[]; 

  @ManyToOne(()=> Test, x=> x.questions, {onDelete: 'CASCADE'})
  test!: Test; 

  @Column()
  testId!: number;

  constructor(from: Partial<Question>) {
    Object.assign(this, from);
  }
}
