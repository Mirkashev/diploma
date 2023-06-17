import { Topic } from 'src/topic/entities/topic.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';


@Entity('theories')
export class Theory {
  @PrimaryColumn({select:false})
  topicId!: number;

  @Column('text', {default:''})
  // @Index()
  content!: string;

  @OneToOne(()=> Topic, x=> x.theory)
  @JoinColumn()
  topic!: Topic;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  @DeleteDateColumn({type: "timestamp"})
  deletedAt?: Date;

  constructor(from: Partial<Theory>) {
    Object.assign(this, from);
  }
}
