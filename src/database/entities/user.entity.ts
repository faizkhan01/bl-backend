import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ type: 'jsonb', default: [] })
  roles!: string[];

  @Column({ type: 'jsonb', nullable: true })
  profile?: { firstName?: string; lastName?: string; companyId?: string };

  @Column({ name: 'invited_by_user_id', type: 'uuid', nullable: true })
  invitedByUserId?: string | null;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


