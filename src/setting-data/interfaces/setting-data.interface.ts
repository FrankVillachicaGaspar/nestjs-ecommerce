import { Setting } from 'src/setting/interfaces/setting.interfaces';

export interface SettingData {
  id: number;
  code: string;
  desc: string;
  value: string;
  settingId: number;
  createdAt: string;
  modifiedAt?: string;
  deletedAt?: string;
  setting?: Setting;
}
