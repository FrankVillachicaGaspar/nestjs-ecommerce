import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';
import DrizzleUserRepository from './repositories/drizzle-user.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    DrizzleUserRepository,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  imports: [DrizzleModule, CommonModule, ConfigModule],
  exports: [DrizzleUserRepository],
})
export class UserModule {}
