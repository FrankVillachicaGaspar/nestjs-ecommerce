import { Setting } from 'src/setting/interfaces/setting.interfaces';

export const settingDataMock: Setting[] = [
  {
    id: 1,
    code: 'contact',
    desc: 'this setting contains all the contacts information',
    createdAt: new Date().toISOString(),
  },
];
