import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../database/entities/report.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(@InjectRepository(Report) private readonly reportsRepo: Repository<Report>) {}

  @Post(':projectId')
  async generate(@Param('projectId') projectId: string) {
    const record = this.reportsRepo.create({ projectId, data: { summary: 'Residual analysis report' } });
    return this.reportsRepo.save(record);
  }

  @Get(':projectId')
  async list(@Param('projectId') projectId: string) {
    return this.reportsRepo.find({ where: { projectId } });
  }
}


