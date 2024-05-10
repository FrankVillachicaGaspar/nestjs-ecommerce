import { Expose } from 'class-transformer';

export class GetSettingDataDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  desc: string;

  @Expose()
  value: string;

  @Expose()
  settingId: number;

  @Expose()
  createdAt: string;

  @Expose()
  modifiedAt: string;
}
