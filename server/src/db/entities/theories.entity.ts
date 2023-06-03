import { Dayjs } from "dayjs";
import { Theme } from "src/db/entities";
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
  themeId!: number;

  @Column('text', {default:''})
  // @Index()
  content!: string;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  @Index()
  createdAt!: Dayjs;

  @OneToOne(()=> Theme, x=> x.theory, {onDelete: 'CASCADE'})
  @JoinColumn()
  theme!: Theme;

  constructor(from: Partial<Theory>) {
    Object.assign(this, from);
  }
}
