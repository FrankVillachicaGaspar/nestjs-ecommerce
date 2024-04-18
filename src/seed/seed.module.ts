import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DrizzleModule, ConfigModule],
})
export class SeedModule {}
