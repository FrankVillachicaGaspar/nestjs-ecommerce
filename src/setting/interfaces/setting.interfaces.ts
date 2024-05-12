import { SettingData } from "src/setting-data/interfaces/setting-data.interface";

export class Setting {
  id: number;
  code: string;
  desc: string;
  createdAt: string;
  modifiedAt?: string;
  deletedAt?: string;
  settingData?: SettingData[];
}
