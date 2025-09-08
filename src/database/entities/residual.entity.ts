import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('residuals')
export class Residual {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @Column({ name: 'form_data', type: 'jsonb', default: {} })
  formData!: Record<string, unknown>;

  @Column({ name: 'ai_result', type: 'jsonb', nullable: true })
  aiResult?: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


