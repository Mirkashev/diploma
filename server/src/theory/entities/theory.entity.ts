import { Topic } from 'src/topic/entities/topic.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';


@Entity('theories')
export class Theory {
  @PrimaryColumn({select:false})
  topicId!: number;

  @Column('text', {default:''})
  // @Index()
  content!: string;

  // @Column('timestamptz', {
  //   default: () => 'CURRENT_TIMESTAMP',
  //   select: false
  // })
  // @Index()
  // createdAt!: Dayjs;

  @OneToOne(()=> Topic, x=> x.theory, {onDelete: 'CASCADE'})
  @JoinColumn()
  topic!: Topic;

  constructor(from: Partial<Theory>) {
    Object.assign(this, from);
  }
}
