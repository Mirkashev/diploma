
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { Test } from 'src/test/entities/test.entity';
import { Theory } from 'src/theory/entities/theory.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  // @Column('timestamptz', {
  //   default: () => 'CURRENT_TIMESTAMP',
  //   select: false
  // })
  // @Index()
  // createdAt!: Dayjs;

  @OneToOne(()=> Theory, x=> x.topic, {cascade: true, onDelete:'CASCADE'})
  theory?: Theory;

  @OneToMany(()=> Test, x=> x.topic, {cascade: true, onDelete:'CASCADE'})
  tests?: Test;

  @OneToMany(()=> Exercise, x=> x.topic, {cascade: true, onDelete:'CASCADE'})
  exercises?: Exercise;

  constructor(from: Partial<Topic>) {
    Object.assign(this, from);
  }
}
