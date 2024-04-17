import { Expose } from 'class-transformer';
export class GetCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  desc: string;

  @Expose()
  createdAt: string;

  @Expose({})
  modifiedAt?: string;
}
