import { Expose, Transform, Type } from 'class-transformer';
import { ShortSettingDto } from 'src/setting/dto/get-short-setting.dto';

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
  @Transform(({ value }) => value ?? '')
  modifiedAt: string;

  @Expose()
  @Type(() => ShortSettingDto)
  setting: ShortSettingDto
}
