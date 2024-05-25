import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedRepository } from '../interfaces/seed-adapter.interface';
import { Category } from 'src/category/interfaces/category.interface';
import { Product } from 'src/product/interfaces/product.interface';
import { Setting } from 'src/setting/interfaces/setting.interfaces';
import { User } from 'src/user/interfaces/user.interface';
import { Role } from '../interfaces/role.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from 'drizzle/schema';
import { SettingData } from 'src/setting-data/interfaces/setting-data.interface';

@Injectable()
export class DrizzleSeedRepository implements SeedRepository, OnModuleInit {
  private db: LibSQLDatabase<typeof schema>;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient(
      DrizzleSeedRepository.name,
    ) as LibSQLDatabase<typeof schema>;
  }

  async cleanDatabaseRecords(): Promise<void> {
    await this.db.delete(schema.user);
    await this.db.delete(schema.product);
    await this.db.delete(schema.settingData);
    await this.db.delete(schema.setting);
    await this.db.delete(schema.category);
    await this.db.delete(schema.role);
    await this.db.delete(schema.settingData);
  }

  async populateRoles(roles: Role[]): Promise<void> {
    await this.db.insert(schema.role).values(roles).onConflictDoNothing();
  }

  async populateUsers(users: User[]): Promise<void> {
    await this.db.insert(schema.user).values(users).onConflictDoNothing();
  }

  async populateCategories(categories: Category[]): Promise<void> {
    await this.db
      .insert(schema.category)
      .values(categories)
      .onConflictDoNothing();
  }

  async populateProducts(products: Product[]): Promise<void> {
    await this.db.insert(schema.product).values(products).onConflictDoNothing();
  }

  async populateSettings(settings: Setting[]): Promise<void> {
    await this.db.insert(schema.setting).values(settings).onConflictDoNothing();
  }

  async populateSettingData(settingDataList: SettingData[]): Promise<void> {
    await this.db.insert(schema.settingData).values(settingDataList).onConflictDoNothing();
  }
}
