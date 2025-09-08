import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId?: string | null;

  @Column({ type: 'jsonb', default: {} })
  fields!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


