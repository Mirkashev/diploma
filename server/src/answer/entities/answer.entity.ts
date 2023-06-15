import { Question } from 'src/question/entities/question.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', {length: 64})
  @Index()
  title!: string;

  @Column('boolean')
  @Index()
  isTrue!: boolean;

  // @Column('timestamptz', {
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // @Index()
  // createdAt!: Dayjs;

  @ManyToOne(()=> Question, x=> x.answers, {onDelete: 'CASCADE'})
  question!: Question; 

  @Column()
  questionId!: number;

  constructor(from: Partial<Answer>) {
    Object.assign(this, from);
  }
}
