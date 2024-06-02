import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';
import { DrizzleRoleRepository } from './repositories/drizzle-role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, DrizzleRoleRepository],
  imports: [DrizzleModule, CommonModule],
})
export class RoleModule {}
