import { Expose, Transform } from 'class-transformer';
export class GetCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }: { value: Date }) => value.toLocaleString())
  createdAt: Date;
}
