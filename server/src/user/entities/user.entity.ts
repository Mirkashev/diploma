import { Group } from 'src/group/entities/group.entity';
import { Result } from 'src/result/entities/result.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,

  ManyToOne,
  OneToMany,

  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ nullable:true})
  groupId?: number | null;

  @Column('varchar', {
    default: 'student',
  })
  @Index()
  role?: string;

  @OneToMany(()=> Result, x=> x.test)
  results?: Result;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  constructor(from: Partial<User>) {
    Object.assign(this, from);
  }
}
