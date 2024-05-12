import { Module } from '@nestjs/common';
import { SettingDataService } from './setting-data.service';
import { SettingDataController } from './setting-data.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleSettingDataRepository } from './repository/drizzle-setting-data.repository';
import { CommonModule } from 'src/common/common.module';
import { SettingsModule } from 'src/setting/setting.module';

@Module({
  controllers: [SettingDataController],
  providers: [SettingDataService, DrizzleSettingDataRepository],
  imports: [DrizzleModule, CommonModule, SettingsModule],
})
export class SettingDataModule {}
