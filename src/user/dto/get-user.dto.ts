import { Expose, Transform, Type } from 'class-transformer';
import { GetShortRoleDto } from 'src/role/dto/get-short-role.dto';

export class GetUserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  createdAt: string;

  @Expose()
  @Transform(({ value }) => value ?? '')
  modifiedAt?: string;

  @Expose()
  @Type(() => GetShortRoleDto)
  role: GetShortRoleDto;
}
