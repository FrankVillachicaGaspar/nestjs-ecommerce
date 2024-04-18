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
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Category } from '../interfaces/category.interface';
import { category } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleCategoryRepository
  implements CategoryRepository, OnModuleInit
{
  private readonly logger = new Logger(DrizzleCategoryRepository.name);
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
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
      this.handleErrors(error);
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
      this.handleErrors(error);
    }

    if (!categoryDb)
      throw new NotFoundException(`Category with id ${id} not found.`);

    return categoryDb;
  }

  async findAll(): Promise<Category[]> {
    let categoryListDb: Category[];
    try {
      categoryListDb = await this.db.select().from(category).all();
    } catch (error) {
      this.handleErrors(error);
    }
    return categoryListDb;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    let categoryDb: Category;

    try {
      categoryDb = await this.db
        .update(category)
        .set({ ...updateCategoryDto })
        .where(eq(category.id, id))
        .returning()
        .get();
    } catch (error) {
      this.handleErrors(error);
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
      this.handleErrors(error);
    }
    if (!categoryDb)
      throw new BadRequestException(
        `Delete failed!. The category with id ${id} not found.`,
      );
  }

  handleErrors(error: any) {
    this.logger.fatal(error);

    if (error.message.includes('UNIQUE constraint'))
      throw new BadRequestException(`the category already exist`);

    throw new InternalServerErrorException(error);
  }
}
