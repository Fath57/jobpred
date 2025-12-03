import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService, AuthGuard, RolesGuard],
})
export class AdminModule {}
