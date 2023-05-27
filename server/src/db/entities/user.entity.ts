import { Dayjs } from 'dayjs';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';

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

  @ManyToOne(()=> Group, x=> x.users)
  group?: Group; 
  // возможно тут возникнут проблемы
  @Column({unique: true, nullable:true})
  groupId?: number;

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

  constructor(from: Partial<User>) {
    Object.assign(this, from);
  }
}
