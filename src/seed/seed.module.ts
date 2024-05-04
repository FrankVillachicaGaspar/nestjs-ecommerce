import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleSeedRepository } from './repositories/drizzle-seed.repository';

@Module({
  controllers: [SeedController],
  providers: [SeedService, DrizzleSeedRepository],
  imports: [DrizzleModule, ConfigModule],
})
export class SeedModule {}
