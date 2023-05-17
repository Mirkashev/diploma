import { Dayjs } from 'dayjs';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @PrimaryColumn('varchar', { length: 32 })
  @Index()
  login!: string;

  @Column('varchar', { length: 32, nullable: true })
  @Index()
  password!: string | null;

  @Column('varchar', { length: 64 })
  firstName!: string;

  @Column('varchar', { length: 64, nullable: true })
  lastName!: string | null;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt!: Dayjs;

  @Column('varchar', {
    default: 'student',
  })
  @Index()
  role!: string;

  constructor(from: Partial<User>) {
    Object.assign(this, from);
  }
}
