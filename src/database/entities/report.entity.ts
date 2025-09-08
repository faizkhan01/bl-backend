import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @Column({ type: 'jsonb', default: {} })
  data!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


