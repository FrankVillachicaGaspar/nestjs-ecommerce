import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { DrizzleCategoryRepository } from './repositories/drizzle-category.repository';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: DrizzleCategoryRepository,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<GetCategoryDto> {
    const category = await this.categoryRepository.create(createCategoryDto);

    return this.dtoConverter.plainToDto(GetCategoryDto, category);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<FindAllResponse<GetCategoryDto[]>> {
    const result = await this.categoryRepository.findAll(paginationQuery);

    const categoryDtoList = result.data.map((category) =>
      this.dtoConverter.plainToDto(GetCategoryDto, category),
    );

    return {
      data: categoryDtoList,
      pagination: result.pagination,
    };
  }

  async findOneById(id: number): Promise<GetCategoryDto> {
    const category = await this.categoryRepository.findById(id);

    return this.dtoConverter.plainToDto(GetCategoryDto, category);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
    const category = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );

    return this.dtoConverter.plainToDto(GetCategoryDto, category);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.remove(id);
  }
}
