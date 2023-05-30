import { Dayjs } from 'dayjs';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Result } from './result.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 32 })
  @Index()
  login!: string;

  @Column('varchar', { length: 32 })
  @Index()
  password!: string;

  @Column('varchar', { length: 64, default:'' })
  firstName?: string;

  @Column('varchar', { length: 64, default:'' })
  lastName?: string;

  @Column('varchar', { length: 64, default:'' })
  surname?: string; 

  @Column('text', { default:'' })
  url?: string;

  @ManyToOne(()=> Group, x=> x.users, {cascade:true})
  group?: Group; 
  // возможно тут возникнут проблемы
  @Column({ nullable:true})
  groupId?: number | null;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP', 
    select: false,
  }) 
  @Index()
  createdAt?: Dayjs;

  @Column('varchar', {
    default: 'student',
  })
  @Index()
  role?: string;

  @OneToMany(()=> Result, x=> x.test)
  results!: Result; 

  constructor(from: Partial<User>) {
    Object.assign(this, from);
  }
}
