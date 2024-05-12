import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';
import { DrizzleCategoryRepository } from './repositories/drizzle-category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, DrizzleCategoryRepository],
  imports: [DrizzleModule, CommonModule],
  exports: [DrizzleCategoryRepository],
})
export class CategoryModule {}
