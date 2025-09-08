import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Residual } from '../database/entities/residual.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('residuals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('residuals')
export class ResidualsController {
  constructor(@InjectRepository(Residual) private readonly residualsRepo: Repository<Residual>) {}
  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN, Role.CUSTOMER_USER)
  @Post('form/:projectId')
  generateForm(@Param('projectId') projectId: string) {
    return { projectId, form: [{ key: 'metricA', type: 'number' }, { key: 'metricB', type: 'number' }] };
  }

  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN, Role.CUSTOMER_USER)
  @Post(':projectId')
  async submit(@Param('projectId') projectId: string, @Body() formData: Record<string, unknown>) {
    const record = this.residualsRepo.create({ projectId, formData, aiResult: { score: 0.87 } });
    return this.residualsRepo.save(record);
  }

  @Get(':projectId')
  async list(@Param('projectId') projectId: string) {
    return this.residualsRepo.find({ where: { projectId } });
  }
}


