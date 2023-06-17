import { Answer } from 'src/answer/entities/answer.entity';
import { Test } from 'src/test/entities/test.entity';
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

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('text')
  @Index()
  title!: string;

  @OneToMany(()=> Answer, x=> x.question, {cascade: true, onUpdate:'CASCADE'})
  answers!: Answer[]; 

  @ManyToOne(()=> Test, x=> x.questions)
  test!: Test; 

  @Column()
  testId!: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  constructor(from: Partial<Question>) {
    Object.assign(this, from);
  }
}
