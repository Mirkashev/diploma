import { Dayjs } from "dayjs";
import { Answer, Question, Theme } from "src/db/entities";

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


@Entity('tests')
export class Test {
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

  @ManyToOne(()=> Theme, x=> x.tests)
  theme!: Theme; 

  @Column({select:false})
  themeId!: number;

  @OneToMany(()=> Question, x=> x.test)
  questions!: Question; 

  constructor(from: Partial<Test>) {
    Object.assign(this, from);
  }
}
