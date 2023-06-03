import { Dayjs } from "dayjs";
import { Theory } from "src/db/entities/theories.entity";
import { Exercise, Test } from "src/db/entities";
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


@Entity('themes')
export class Theme {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  @Index()
  createdAt!: Dayjs;

  @OneToOne(()=> Theory, x=> x.theme, {cascade: true, onDelete:'CASCADE'})
  theory?: Theory;

  @OneToMany(()=> Test, x=> x.theme, {cascade: true, onDelete:'CASCADE'})
  tests?: Test;

  @OneToMany(()=> Exercise, x=> x.theme, {cascade: true, onDelete:'CASCADE'})
  exercises?: Exercise;

  constructor(from: Partial<Theme>) {
    Object.assign(this, from);
  }
}
