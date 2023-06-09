import { Dayjs } from "dayjs";
import { Exercise, Theme } from "src/db/entities";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';


@Entity('exercise_schema')
export class ExerciseShema {
  @PrimaryColumn({select:false})
  exerciseId!: number;

  @Column('text', {default:''})
  // @Index()
  content!: string;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  @Index()
  createdAt!: Dayjs;

  @OneToOne(()=> Exercise, x=> x.exerciseSchema)
  exercise!: Exercise;

  constructor(from: Partial<ExerciseShema>) {
    Object.assign(this, from);
  }
}
