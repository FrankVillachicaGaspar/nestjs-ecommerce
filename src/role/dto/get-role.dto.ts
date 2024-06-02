import { Expose, Transform } from 'class-transformer';

export class GetRoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  createdAt: string;

  @Expose()
  @Transform(({ value }) => value ?? '')
  modifiedAt: string;
}
