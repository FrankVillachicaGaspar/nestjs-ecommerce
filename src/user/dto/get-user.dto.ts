import { Expose, Transform } from 'class-transformer';

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
}
