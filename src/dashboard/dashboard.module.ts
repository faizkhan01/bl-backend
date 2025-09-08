import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Project } from '../database/entities/project.entity';
import { Asset } from '../database/entities/asset.entity';
import { Report } from '../database/entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, Asset, Report])],
  controllers: [DashboardController],
})
export class DashboardModule {}


