{}
import { Dayjs } from 'dayjs';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  @OneToMany(()=> User, x=> x.group)
  users?: User; 

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })

  @Index()
  createdAt?: Dayjs;

  constructor(from: Partial<Group>) {
    Object.assign(this, from);
  }
}
