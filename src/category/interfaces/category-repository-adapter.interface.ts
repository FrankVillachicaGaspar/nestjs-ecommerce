import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from './category.interface';

export interface CategoryRepository {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;

  findById(id: number): Promise<Category>;

  findAll(): Promise<Category[]>;

  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;

  remove(id: number): Promise<void>;
}
