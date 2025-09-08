import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Asset } from './entities/asset.entity';
import { Residual } from './entities/residual.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'fourami',
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      synchronize: false,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
  ],
  exports: [TypeOrmModule],
})
export class OrmRootModule {}


