import { Module } from '@nestjs/common';
import { ResidualsController } from './residuals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Residual } from '../database/entities/residual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Residual])],
  controllers: [ResidualsController],
})
export class ResidualsModule {}


