import { Expose, Type } from 'class-transformer';
import { ShortCategoryDto } from 'src/category/dto/short-category.dto';

export class GetProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  desc: string;

  @Expose()
  stock: number;

  @Expose()
  price: number;

  @Expose()
  createdAt: string;

  @Expose()
  modifiedAt?: string;

  @Expose()
  @Type(() => ShortCategoryDto)
  category: ShortCategoryDto;
}
