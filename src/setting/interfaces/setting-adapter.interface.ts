import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { Setting } from './setting.interfaces';

export interface SettingRepository {
  create(createSettingDto: CreateSettingDto): Promise<Setting>;
  getAll(): Promise<Setting[]>;
  getById(id: number): Promise<Setting>;
  update(id: number, updateSettingDto: UpdateSettingDto): Promise<Setting>;
  remove(id: number): Promise<void>;
}
