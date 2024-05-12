import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';
import { DrizzleProductRepository } from './repositories/drizzle-product.repository';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DrizzleProductRepository],
  imports: [DrizzleModule, CommonModule, CategoryModule],
})
export class ProductModule {}
