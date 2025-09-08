import { Role } from './roles.enum';

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  roles: Role[];
  profile?: {
    firstName?: string;
    lastName?: string;
    companyId?: string;
  };
  invitedByUserId?: string;
};

export type ProjectRecord = {
  id: string;
  name: string;
  ownerUserId: string;
  status: 'pending' | 'active' | 'completed';
  assetIds: string[];
  createdAt: Date;
};

export type AssetRecord = {
  id: string;
  name: string;
  projectId?: string;
  fields: Record<string, unknown>;
  createdAt: Date;
};

export type ResidualRecord = {
  id: string;
  projectId: string;
  formData: Record<string, unknown>;
  aiResult?: Record<string, unknown>;
  createdAt: Date;
};

export type ReportRecord = {
  id: string;
  projectId: string;
  data: Record<string, unknown>;
  createdAt: Date;
};

class InMemoryStore {
  users: Map<string, UserRecord> = new Map();
  projects: Map<string, ProjectRecord> = new Map();
  assets: Map<string, AssetRecord> = new Map();
  residuals: Map<string, ResidualRecord> = new Map();
  reports: Map<string, ReportRecord> = new Map();

  generateId(prefix: string): string {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export const db = new InMemoryStore();


