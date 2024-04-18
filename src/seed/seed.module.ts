import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DrizzleModule],
})
export class SeedModule {}
