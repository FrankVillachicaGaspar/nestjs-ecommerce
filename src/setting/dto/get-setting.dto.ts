import { Expose, Type } from 'class-transformer';
import { GetSettingDataDto } from 'src/setting-data/dto/get-setting-data.dto';
import { ShortSettingDataDto } from 'src/setting-data/dto/get-short-setting-data.dto';

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
  @Type(() => ShortSettingDataDto)
  settingData?: ShortSettingDataDto[];
}
