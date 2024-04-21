import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ProductRepository } from '../interfaces/product-repository-adapter.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../interfaces/product.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { product } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleProductRepository
  implements ProductRepository, OnModuleInit
{
  private readonly logger = new Logger(DrizzleProductRepository.name);
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
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
      this.handleErrors(error);
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
      this.handleErrors(error);
    }
    if (!productDb)
      throw new NotFoundException(`Product with id ${id} not found`);

    return productDb;
  }

  async findAll(): Promise<Product[]> {
    let productListDb: Product[];
    try {
      productListDb = await this.db.select().from(product).all();
    } catch (error) {
      this.handleErrors(error);
    }
    return productListDb;
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
      this.handleErrors(error);
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
      this.handleErrors(error);
    }
    if (!productDb)
      throw new BadRequestException(
        `Delete failed!. The category with id ${id} not found`,
      );
  }

  handleErrors(error: any) {
    this.logger.fatal(error);

    if (error.message.includes('UNIQUE constraint'))
      throw new BadRequestException(`the category already exist`);

    throw new InternalServerErrorException(error);
  }
}
