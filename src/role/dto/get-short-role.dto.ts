import { Expose } from 'class-transformer';

export class GetShortRoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
