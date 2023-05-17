import { Dayjs } from "dayjs";
import { Theory } from "src/api/theories/entities/theories.entity";
import { Test } from "src/db/entities";
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

  @OneToOne(()=> Theory, x=> x.theme, {cascade: true})
  theory?: Theory;

  @OneToMany(()=> Test, x=> x.theme, {cascade: true})
  tests?: Test;

  constructor(from: Partial<Theme>) {
    Object.assign(this, from);
  }
}
