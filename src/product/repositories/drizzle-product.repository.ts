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
import { count, eq } from 'drizzle-orm';
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
    try {
      const productDb: Product = await this.db.query.product.findFirst({
        where: (product, { eq }) => eq(product.id, id),
        with: {
          category: true,
        },
      });

      if (!productDb)
        throw new NotFoundException(`Product with id ${id} not found`);

      return productDb;
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
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

      const products: Product[] = await this.db.query.product.findMany({
        with: {
          category: true,
        },
        limit,
        offset: calculateOffset(limit, page),
      });

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
    try {
      const result = await this.db
        .update(schema.product)
        .set({ ...updateProductDto, modifiedAt: new Date().toISOString() })
        .where(eq(schema.product.id, id))
        .returning({ productId: schema.product.id })
        .get();

      if (!result)
        throw new BadRequestException(
          `Update failed. Product with id ${id} not found`,
        );

      const productDb: Product = await this.findById(result.productId);

      return productDb;
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const productDb: Product = await this.db
        .delete(schema.product)
        .where(eq(schema.product.id, id))
        .returning()
        .get();

      if (!productDb)
        throw new BadRequestException(
          `Delete failed!. The product with id ${id} not found`,
        );
    } catch (error) {
      handleDrizzleErrors(error, 'product', this.logger);
    }
  }
}
