import { Expose } from 'class-transformer';

export class ShortSettingDataDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  desc: string;

  @Expose()
  value: string;
}
