import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [DrizzleModule, CommonModule],
})
export class CategoryModule {}
