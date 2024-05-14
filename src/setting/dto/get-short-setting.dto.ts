import { Expose } from 'class-transformer';

export class ShortSettingDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  desc: string;
}
