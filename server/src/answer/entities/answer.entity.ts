import { Question } from 'src/question/entities/question.entity';
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
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  @ManyToOne(()=> Question, x=> x.answers)
  question!: Question; 

  @Column()
  questionId!: number;

  constructor(from: Partial<Answer>) {
    Object.assign(this, from);
  }
}
