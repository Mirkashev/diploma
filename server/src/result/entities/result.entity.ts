import { Question } from 'src/question/entities/question.entity';
import { Test } from 'src/test/entities/test.entity';
import { User } from 'src/user/entities/user.entity';
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


@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ManyToOne(()=> Test, x=> x.results, {onDelete: 'CASCADE'})
  test!: Test; 

  @Column()
  testId!: number;

  @ManyToOne(()=> User, x=> x.results, {onDelete:'CASCADE'})
  user!: User; 

  @Column()
  userId!: number;

  @OneToMany(()=> Question, x=> x.test)
  questions!: Question; 

  @Column('float')
  percent!: number;

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
