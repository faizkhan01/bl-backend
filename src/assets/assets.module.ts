import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../database/entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [AssetsController],
})
export class AssetsModule {}


