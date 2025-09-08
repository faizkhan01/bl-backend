import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Project } from '../database/entities/project.entity';
import { Asset } from '../database/entities/asset.entity';
import { Report } from '../database/entities/report.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Project) private readonly projectsRepo: Repository<Project>,
    @InjectRepository(Asset) private readonly assetsRepo: Repository<Asset>,
    @InjectRepository(Report) private readonly reportsRepo: Repository<Report>,
  ) {}
  @Get()
  async stats() {
    const [pendingProjects, numUsers, numAssets, reports] = await Promise.all([
      this.projectsRepo.count({ where: { status: 'pending' } as any }),
      this.usersRepo.count(),
      this.assetsRepo.count(),
      this.reportsRepo.count(),
    ]);
    return { pendingProjects, numUsers, numAssets, reports, quickActions: ['add_user', 'add_project', 'import_asset'] };
  }
}


