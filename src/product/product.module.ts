import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';
import { DrizzleProductRepository } from './repositories/drizzle-product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DrizzleProductRepository],
  imports: [DrizzleModule, CommonModule],
})
export class ProductModule {}
