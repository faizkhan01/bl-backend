import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AssetsModule } from './assets/assets.module';
import { ResidualsModule } from './residuals/residuals.module';
import { ReportsModule } from './reports/reports.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrmRootModule } from './database/typeorm.module';
import { ConfigModule } from '@nestjs/config';
// Using process.env directly; no ConfigModule

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		OrmRootModule,
		CommonModule,
		AuthModule,
		UsersModule,
		ProjectsModule,
		AssetsModule,
		ResidualsModule,
		ReportsModule,
		DashboardModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
