import { Expose } from 'class-transformer';

export class GetSettingDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  desc: string;

  @Expose()
  createdAt: string;

  @Expose()
  modifiedAt?: string;

  @Expose()
  deletedAt?: string;
}
