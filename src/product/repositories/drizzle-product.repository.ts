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
      const { productId } = await this.db
        .insert(schema.product)
        .values({ ...createProductDto, createdAt: new Date().toISOString() })
        .returning({ productId: schema.product.id })
        .get();

      productDb = await this.findById(productId);
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
    return productDb;
  }

  async findById(id: number): Promise<Product> {
    let productDb: Product;
    try {
      productDb = await this.db
        .select({
          id: schema.product.id,
          name: schema.product.name,
          desc: schema.product.desc,
          stock: schema.product.stock,
          categoryId: schema.product.categoryId,
          price: schema.product.price,
          createdAt: schema.product.createdAt,
          modifiedAt: schema.product.modifiedAt,
          deletedAt: schema.product.deletedAt,
          category: {
            id: schema.category.id,
            name: schema.category.name,
            desc: schema.category.desc,
            createdAt: schema.category.createdAt,
            modifiedAt: schema.category.modifiedAt,
            deletedAt: schema.category.deletedAt,
          },
        })
        .from(schema.product)
        .innerJoin(
          schema.category,
          eq(schema.product.categoryId, schema.category.id),
        )
        .where(eq(schema.product.id, id))
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
        .from(schema.product)
        .get();

      const pagination = calculatePaginationData(totalItems, limit, page);

      const products: Product[] = await this.db
        .select({
          id: schema.product.id,
          name: schema.product.name,
          desc: schema.product.desc,
          stock: schema.product.stock,
          categoryId: schema.product.categoryId,
          price: schema.product.price,
          createdAt: schema.product.createdAt,
          modifiedAt: schema.product.modifiedAt,
          deletedAt: schema.product.deletedAt,
          category: {
            id: schema.category.id,
            name: schema.category.name,
            desc: schema.category.desc,
            createdAt: schema.category.createdAt,
            modifiedAt: schema.category.modifiedAt,
            deletedAt: schema.category.deletedAt,
          },
        })
        .from(schema.product)
        .innerJoin(
          schema.category,
          eq(schema.product.categoryId, schema.category.id),
        )
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
      const { productId } = await this.db
        .update(schema.product)
        .set({ ...updateProductDto, modifiedAt: new Date().toISOString() })
        .where(eq(schema.product.id, id))
        .returning({ productId: schema.product.id })
        .get();

      productDb = await this.findById(productId);
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
        .delete(schema.product)
        .where(eq(schema.product.id, id))
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
