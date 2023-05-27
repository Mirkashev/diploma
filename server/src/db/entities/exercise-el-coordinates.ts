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

  @Column('varchar', { length: 256})
  @Index()
  x!: string;

  @Column('varchar', { length: 256})
  @Index()
  y!: string;

  @Column('varchar', { length: 64})
  @Index()
  width!: string;

  @Column('varchar', { length: 64})
  @Index()
  height!: string;

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
