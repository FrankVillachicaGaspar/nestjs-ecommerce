import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from 'config/env.config';
import { JoiValidationSchema } from 'config/joi.validations';
import { CategoryModule } from './category/category.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { SeedModule } from './seed/seed.module';
import { ProductModule } from './product/product.module';
import { SettingsModule } from './setting/setting.module';
import { SettingDataModule } from './setting-data/setting-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    CommonModule,
    UserModule,
    CategoryModule,
    DrizzleModule,
    SeedModule,
    ProductModule,
    SettingsModule,
    SettingDataModule,
  ],
})
export class AppModule {}
