import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
    let categoryDb: Category;
    try {
      categoryDb = await this.db
        .insert(category)
        .values({
          ...createCategoryDto,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }
    return categoryDb;
  }

  async findById(id: number): Promise<Category> {
    let categoryDb: Category;

    try {
      categoryDb = await this.db
        .select()
        .from(category)
        .where(eq(category.id, id))
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }

    if (!categoryDb)
      throw new NotFoundException(`Category with id ${id} not found.`);

    return categoryDb;
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
    let categoryDb: Category;

    try {
      categoryDb = await this.db
        .update(category)
        .set({ ...updateCategoryDto, modifiedAt: new Date().toISOString() })
        .where(eq(category.id, id))
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }

    if (!categoryDb)
      throw new BadRequestException(
        `Update failed. Category with id ${id} not found.`,
      );

    return categoryDb;
  }

  async remove(id: number): Promise<void> {
    let categoryDb: Category;
    try {
      categoryDb = await this.db
        .delete(category)
        .where(eq(category.id, id))
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'category', this.logger);
    }
    if (!categoryDb)
      throw new BadRequestException(
        `Delete failed!. The category with id ${id} not found.`,
      );
  }
}
