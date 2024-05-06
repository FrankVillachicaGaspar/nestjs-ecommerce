import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ProductRepository } from '../interfaces/product-repository-adapter.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../interfaces/product.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { product } from 'drizzle/schema';
import { count, eq, sql } from 'drizzle-orm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import * as schema from 'drizzle/schema';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import {
  calculateOffset,
  calculatePaginationData,
} from 'src/common/utils/pagination.utils';
import { handleDrizzleErrors } from 'src/common/errors/drizzle.error';

@Injectable()
export class DrizzleProductRepository
  implements ProductRepository, OnModuleInit
{
  private readonly logger = new Logger(DrizzleProductRepository.name);
  private db: LibSQLDatabase<typeof schema>;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient(
      DrizzleProductRepository.name,
    ) as LibSQLDatabase<typeof schema>;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    let productDb: Product;
    try {
      productDb = await this.db
        .insert(product)
        .values({ ...createProductDto, createdAt: new Date().toISOString() })
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
    return productDb;
  }

  async findById(id: number): Promise<Product> {
    let productDb: Product;
    try {
      productDb = await this.db
        .select()
        .from(product)
        .where(eq(product.id, id))
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
    if (!productDb)
      throw new NotFoundException(`Product with id ${id} not found`);

    return productDb;
  }

  async findAll({
    limit,
    page,
  }: PaginationQueryDto): Promise<FindAllResponse<Product[]>> {
    try {
      const { totalItems } = await this.db
        .select({ totalItems: count() })
        .from(product)
        .get();

      const pagination = calculatePaginationData(totalItems, limit, page);

      const products = await this.db
        .select()
        .from(product)
        .limit(limit)
        .offset(calculateOffset(limit, page))
        .all();

      return {
        data: products,
        pagination,
      };
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    let productDb: Product;
    try {
      productDb = await this.db
        .update(product)
        .set({ ...updateProductDto, modifiedAt: new Date().toISOString() })
        .where(eq(product.id, id))
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
    if (!productDb)
      throw new BadRequestException(
        `Update failed. Product with id ${id} not found`,
      );
    return productDb;
  }

  async remove(id: number): Promise<void> {
    let productDb: Product;
    try {
      productDb = await this.db
        .delete(product)
        .where(eq(product.id, id))
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
    if (!productDb)
      throw new BadRequestException(
        `Delete failed!. The product with id ${id} not found`,
      );
  }
}
