import { SettingData } from 'src/setting-data/interfaces/setting-data.interface';

export const settingDataDataMock: SettingData[] = [
  {
    id: 1,
    code: 'phone',
    desc: 'Phone number',
    value: '+51 995659253',
    settingId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: 'email',
    desc: 'The email address',
    value: 'sample@gmail.com',
    settingId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: 'WhatsApp',
    desc: 'The WhatsApp number',
    value: '51996545354',
    settingId: 1,
    createdAt: new Date().toISOString(),
  },
];
