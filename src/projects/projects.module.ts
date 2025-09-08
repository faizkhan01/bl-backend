import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../database/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
})
export class ProjectsModule {}


