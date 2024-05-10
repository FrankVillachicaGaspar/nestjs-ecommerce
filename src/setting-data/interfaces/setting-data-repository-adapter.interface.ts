import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateSettingDataDto } from '../dto/create-setting-data.dto';
import { SettingData } from './setting-data.interface';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import { UpdateSettingDataDto } from '../dto/update-setting-data.dto';

export interface SettingDataRepository {
  create(createSettingDataDto: CreateSettingDataDto): Promise<SettingData>;

  findById(id: number): Promise<SettingData>;

  findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<FindAllResponse<SettingData[]>>;

  update(
    id: number,
    updateSettingDataDto: UpdateSettingDataDto,
  ): Promise<SettingData>;

  remove(id: number): Promise<void>;
}
