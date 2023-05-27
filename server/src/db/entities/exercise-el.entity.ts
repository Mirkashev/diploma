import { Dayjs } from "dayjs";
import { Exercise, Theme, ExerciseElCoordinates } from "src/db/entities";

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


@Entity('exercise_el')
export class ExerciseEl {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt!: Dayjs;

  @Column({length: 1024, default:'https://img1.freepng.ru/20180219/gvw/kisspng-ammeter-ampere-symbol-voltmeter-clip-art-eye-of-kanaloa-5a8b0268b34329.9502828215190595607343.jpg'})
  url!: string;

  @OneToMany(()=> ExerciseElCoordinates, x=> x.exerciseEl)
  exerciseElCoordinates!: ExerciseElCoordinates; 

  constructor(from: Partial<ExerciseEl>) {
    Object.assign(this, from);
  }
}
