import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../database/entities/asset.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
  constructor(@InjectRepository(Asset) private readonly assetsRepo: Repository<Asset>) {}
  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN)
  @Post('form')
  generateForm(@Body() body: { fields: string[] }) {
    return { form: body.fields.map((f) => ({ key: f, type: 'string' })) };
  }

  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN)
  @Post()
  async create(@Body() body: { name: string; fields: Record<string, unknown>; projectId?: string }) {
    const rec = this.assetsRepo.create({ name: body.name, fields: body.fields, projectId: body.projectId ?? null });
    return this.assetsRepo.save(rec);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER_ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @Post('import')
  bulkImport(@UploadedFile() _file: any) {
    return { imported: 0, message: 'Bulk import stub' };
  }

  @Get()
  async list() {
    return this.assetsRepo.find();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.assetsRepo.findOne({ where: { id } });
  }
}


