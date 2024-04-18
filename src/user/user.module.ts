import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';
import DrizzleUserRepository from './repositories/drizzle-user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, DrizzleUserRepository],
  imports: [DrizzleModule, CommonModule],
})
export class UserModule {}
