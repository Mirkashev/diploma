
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { Test } from 'src/test/entities/test.entity';
import { Theory } from 'src/theory/entities/theory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 64 })
  @Index()
  title!: string;

  @OneToOne(()=> Theory, x=> x.topic, { cascade:true })
  theory?: Theory;

  @OneToMany(()=> Test, x=> x.topic, { cascade:true })
  tests?: Test;

  @OneToMany(()=> Exercise, x=> x.topic, { cascade:true })
  exercises?: Exercise;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  constructor(from: Partial<Topic>) {
    Object.assign(this, from);
  }
}
