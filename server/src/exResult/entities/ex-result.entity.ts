import { Exercise } from 'src/exercise/entities/exercise.entity';
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


@Entity('ex_results')
export class ExResult {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ManyToOne(()=> Exercise, x=> x.results, {onDelete: 'CASCADE'})
  exercise!: Exercise; 

  @Column()
  exerciseId!: number;

  @ManyToOne(()=> User, x=> x.results, {onDelete:'CASCADE'})
  user!: User; 

  @Column()
  userId!: number;

  @Column('boolean')
  isTrue!: boolean;

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
