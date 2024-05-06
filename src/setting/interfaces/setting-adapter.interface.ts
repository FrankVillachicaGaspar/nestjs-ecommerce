import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { Setting } from './setting.interfaces';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export interface SettingRepository {
  create(createSettingDto: CreateSettingDto): Promise<Setting>;
  getAll(pagination: PaginationQueryDto): Promise<FindAllResponse<Setting[]>>;
  getById(id: number): Promise<Setting>;
  update(id: number, updateSettingDto: UpdateSettingDto): Promise<Setting>;
  remove(id: number): Promise<void>;
}
