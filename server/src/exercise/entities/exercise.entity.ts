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

  // @Column('timestamptz', {
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // @Index()
  // createdAt!: Dayjs;

  @ManyToOne(()=> Topic, x=> x.exercises, {onDelete: 'CASCADE'})
  topic!: Topic; 

  @Column({select:false})
  topicId!: number;
 
  @Column('text', {default:''})
  content?: string;

  // @OneToMany(()=> ExerciseElCoordinates, x=> x.exercise, { cascade: true })
  // exerciseElCoordinates!: ExerciseElCoordinates; 

  constructor(from: Partial<Exercise>) {
    Object.assign(this, from);
  }
}
