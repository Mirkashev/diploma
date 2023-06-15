import { Question } from 'src/question/entities/question.entity';
import { Result } from 'src/result/entities/result.entity';
import { Topic } from 'src/topic/entities/topic.entity';
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


@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  // @Column('timestamptz', {
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // @Index()
  // createdAt!: Dayjs;

  @ManyToOne(()=> Topic, x=> x.tests, {onDelete: 'CASCADE'})
  topic!: Topic; 

  @Column({select:false})
  topicId!: number;

  @OneToMany(()=> Question, x=> x.test)
  questions!: Question[]; 

  @OneToMany(()=> Result, x=> x.test)
  results!: Result; 

  constructor(from: Partial<Test>) {
    Object.assign(this, from);
  }
}
