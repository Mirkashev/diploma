import { Dayjs } from "dayjs";
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  @Column('varchar', { length: 1024 })
  @Index()
  url!: string;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt!: Dayjs;

  constructor(from: Partial<Media>) {
    Object.assign(this, from);
  }
}
