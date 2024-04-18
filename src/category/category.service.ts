import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { category } from 'drizzle/schema';
import { eq } from 'drizzle-orm';
import { Category } from './interfaces/category.interface';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

@Injectable()
export class CategoryService implements OnModuleInit {
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly dtoConverter: DtoConverter,
  ) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<GetCategoryDto> {
    try {
      const categoryDb = await this.db
        .insert(category)
        .values({
          name: createCategoryDto.name,
          desc: createCategoryDto.desc,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();

      return this.dtoConverter.plainToDto(GetCategoryDto, categoryDb);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    try {
      const categoriesDb = await this.db.select().from(category).all();

      const categoriesDto = categoriesDb.map((category) =>
        this.dtoConverter.plainToDto(GetCategoryDto, category),
      );

      return categoriesDto;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOneById(id: number) {
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

    if (!categoryDb) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.dtoConverter.plainToDto(GetCategoryDto, categoryDb);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let categoryDb: Category;
    try {
      categoryDb = await this.db
        .update(category)
        .set({
          ...updateCategoryDto,
          modifiedAt: new Date().toISOString(),
        })
        .where(eq(category.id, id))
        .returning()
        .get();
    } catch (error) {
      this.handleErrors(error);
    }
    if (!categoryDb)
      throw new NotFoundException(
        `Update failed! The category with id ${id} not found`,
      );
    return this.dtoConverter.plainToDto(GetCategoryDto, categoryDb);
  }

  async remove(id: number) {
    let categoryDb: Category;
    try {
      categoryDb = await this.db
        .delete(category)
        .where(eq(category.id, id))
        .returning()
        .get();
    } catch (error) {}
    if (!categoryDb)
      throw new BadRequestException(
        `Delete failed! The category with id ${id} not found`,
      );
    return this.dtoConverter.plainToDto(GetCategoryDto, categoryDb);
  }

  private handleErrors(error: any) {
    if (error.message.includes('UNIQUE constraint'))
      throw new BadRequestException(`the category already exist`);

    throw new InternalServerErrorException(
      'Unexpected error has occurred - check the logs',
    );
  }
}
