import { ExResult } from 'src/exResult/entities/ex-result.entity';
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


@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;
  // todo: поставить ограничение на описание в тысячу символов на фронте
  @Column('varchar', { length: 1024, default:'' })
  // @Index()
  description!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  @ManyToOne(()=> Topic, x=> x.exercises, {onDelete: 'CASCADE'})
  topic!: Topic; 

  @Column({select:false})
  topicId!: number;
 
  @Column('text', {default:''})
  content?: string;

  @OneToMany(()=> ExResult, x=> x.exercise, {cascade:true})
  results: ExResult;

  // @OneToMany(()=> ExerciseElCoordinates, x=> x.exercise, { cascade: true })
  // exerciseElCoordinates!: ExerciseElCoordinates; 

  constructor(from: Partial<Exercise>) {
    Object.assign(this, from);
  }
}
