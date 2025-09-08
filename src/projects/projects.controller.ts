import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../database/entities/project.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(@InjectRepository(Project) private readonly projectsRepo: Repository<Project>) {}
  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN, Role.CUSTOMER_USER)
  @Post()
  async create(@Body() body: { name: string; assetIds?: string[] }, @Req() req: any) {
    const record = this.projectsRepo.create({
      name: body.name,
      ownerUserId: req.user.userId,
      status: 'pending',
      assetIds: body.assetIds ?? [],
    });
    return this.projectsRepo.save(record);
  }

  @Get()
  async list() {
    return this.projectsRepo.find();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.projectsRepo.findOne({ where: { id } });
  }
}


