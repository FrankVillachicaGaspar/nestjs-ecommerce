import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { category } from 'drizzle/schema';
import { eq } from 'drizzle-orm';
import { Category } from './interfaces/category.interface';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';

@Injectable()
export class CategoryService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<GetCategoryDto> {
    try {
      const categoryDb = await this.drizzle
        .getClient()
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
      const categoriesDb = await this.drizzle
        .getClient()
        .select()
        .from(category)
        .all();

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
      categoryDb = await this.drizzle
        .getClient()
        .select()
        .from(category)
        .where(eq(category.id, id))
        .get();
    } catch (error) {
      this.handleErrors(error);
    }

    if (!categoryDb) {
      console.log('Entro al error');
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.dtoConverter.plainToDto(GetCategoryDto, categoryDb);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let categoryDb: Category;
    try {
      categoryDb = await this.drizzle
        .getClient()
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
      categoryDb = await this.drizzle
        .getClient()
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
    console.log(error);

    if (error.message.includes('UNIQUE constraint'))
      throw new BadRequestException(`the category already exist`);

    throw new InternalServerErrorException(
      'Unexpected error has occurred - check the logs',
    );
  }
}
