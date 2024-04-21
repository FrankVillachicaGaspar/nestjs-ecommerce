import { Expose } from 'class-transformer';

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
  categoryId: number;

  @Expose()
  price: number;

  @Expose()
  createdAt: string;

  @Expose()
  modifiedAt?: string;
}
