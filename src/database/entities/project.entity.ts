import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Index()
  @Column({ name: 'owner_user_id', type: 'uuid' })
  ownerUserId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_user_id' })
  owner?: User;

  @Index()
  @Column({ type: 'varchar', length: 32, default: 'pending' })
  status!: 'pending' | 'active' | 'completed';

  @Column({ type: 'jsonb', default: [] })
  assetIds!: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


