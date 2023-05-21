import { Dayjs } from "dayjs";
import { Exercise, ExerciseEl, Theme } from "src/db/entities";

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


@Entity('exercise_el_coordinates')
export class ExerciseElCoordinates {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('int')
  @Index()
  x!: number;

  @Column('int')
  @Index()
  y!: number;

  @Column('int')
  @Index()
  width!: number;

  @Column('int')
  @Index()
  height!: number;

  @ManyToOne(()=> Exercise, x=> x.exerciseElCoordinates)
  exercise!: Exercise; 

  @Column()
  exerciseId!: number;

  @ManyToOne(()=> ExerciseEl, x=> x.exerciseElCoordinates)
  exerciseEl!: ExerciseEl; 

  @Column()
  exerciseElId!: number;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt!: Dayjs;

  constructor(from: Partial<ExerciseElCoordinates>) {
    Object.assign(this, from);
  }
}
