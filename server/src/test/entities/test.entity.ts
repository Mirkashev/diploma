import { Question } from 'src/question/entities/question.entity';
import { Result } from 'src/result/entities/result.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
  UpdateDateColumn,
} from 'typeorm';


@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  @ManyToOne(()=> Topic, x=> x.tests)
  topic!: Topic; 

  @Column({select:false})
  topicId!: number;

  @OneToMany(()=> Question, x=> x.test, {cascade: true})
  questions!: Question[]; 

  @OneToMany(()=> Result, x=> x.test, {cascade: true})
  results!: Result; 

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  constructor(from: Partial<Test>) {
    Object.assign(this, from);
  }
}
