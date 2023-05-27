import { Dayjs } from "dayjs";
import { Theme, ExerciseEl, ExerciseElCoordinates } from "src/db/entities";

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


  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt!: Dayjs;

  @ManyToOne(()=> Theme, x=> x.exercises)
  theme!: Theme; 

  @Column({select:false})
  themeId!: number;
 
  @Column('varchar', {length: 1024, default:''})
  url!: string;

  @OneToMany(()=> ExerciseElCoordinates, x=> x.exercise, { cascade: true })
  exerciseElCoordinates!: ExerciseElCoordinates; 

  constructor(from: Partial<Exercise>) {
    Object.assign(this, from);
  }
}
