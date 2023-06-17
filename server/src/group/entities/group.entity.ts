{}
import { User } from 'src/user/entities/user.entity';
// import { Dayjs } from 'dayjs';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { User } from './user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  @OneToMany(()=> User, x=> x.group)
  users?: User[]; 

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  constructor(from: Partial<Group>) {
    Object.assign(this, from);
  }
}
