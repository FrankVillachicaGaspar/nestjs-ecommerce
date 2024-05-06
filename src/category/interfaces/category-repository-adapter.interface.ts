import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from './category.interface';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';

export interface CategoryRepository {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;

  findById(id: number): Promise<Category>;

  findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<FindAllResponse<Category[]>>;

  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;

  remove(id: number): Promise<void>;
}
