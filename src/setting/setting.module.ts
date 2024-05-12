import { Module } from '@nestjs/common';
import { SettingsService } from './setting.service';
import { SettingsController } from './setting.controller';
import { DrizzleSettingRepository } from './repositories/drizzle-setting.repository';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, DrizzleSettingRepository],
  imports: [DrizzleModule, CommonModule],
  exports: [DrizzleSettingRepository],
})
export class SettingsModule {}
