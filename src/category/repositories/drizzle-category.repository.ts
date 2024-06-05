import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../interfaces/category-repository-adapter.interface';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Category } from '../interfaces/category.interface';
import { category } from 'drizzle/schema';
import { count, eq } from 'drizzle-orm';
import * as schema from 'drizzle/schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import {
  calculateOffset,
  calculatePaginationData,
} from 'src/common/utils/pagination.utils';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import { handleDrizzleErrors } from 'src/common/errors/drizzle.error';

@Injectable()
export class DrizzleCategoryRepository
  implements CategoryRepository, OnModuleInit
{
  private readonly logger = new Logger(DrizzleCategoryRepository.name);
  private db: LibSQLDatabase<typeof schema>;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient(
      DrizzleCategoryRepository.name,
    ) as LibSQLDatabase<typeof schema>;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const categoryDb: Category = await this.db
        .insert(category)
        .values({
          ...createCategoryDto,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();

      return categoryDb;
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }
  }

  async findById(id: number): Promise<Category> {
    try {
      const categoryDb: Category = await this.db
        .select()
        .from(category)
        .where(eq(category.id, id))
        .get();

      if (!categoryDb)
        throw new NotFoundException(`Category with id ${id} not found.`);

      return categoryDb;
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }
  }

  async findAll({
    limit,
    page,
  }: PaginationQueryDto): Promise<FindAllResponse<Category[]>> {
    try {
      const { totalItems } = await this.db
        .select({ totalItems: count() })
        .from(category)
        .get();

      const pagination = calculatePaginationData(totalItems, limit, page);

      const categoryListDb = await this.db
        .select()
        .from(category)
        .limit(limit)
        .offset(calculateOffset(limit, page))
        .all();

      return {
        data: categoryListDb,
        pagination,
      };
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const categoryDb: Category = await this.db
        .update(category)
        .set({ ...updateCategoryDto, modifiedAt: new Date().toISOString() })
        .where(eq(category.id, id))
        .returning()
        .get();

      if (!categoryDb)
        throw new BadRequestException(
          `Update failed. Category with id ${id} not found.`,
        );

      return categoryDb;
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const categoryDb: Category = await this.db
        .delete(category)
        .where(eq(category.id, id))
        .returning()
        .get();

      if (!categoryDb)
        throw new BadRequestException(
          `Delete failed!. The category with id ${id} not found.`,
        );
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }
  }
}
