import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedRepository } from '../interfaces/seed-adapter.interface';
import { Category } from 'src/category/interfaces/category.interface';
import { Product } from 'src/product/interfaces/product.interface';
import { Setting } from 'src/setting/interfaces/setting.interfaces';
import { User } from 'src/user/interfaces/user.interface';
import { Role } from '../interfaces/role.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { category, product, role, setting, user } from 'drizzle/schema';

@Injectable()
export class DrizzleSeedRepository implements SeedRepository, OnModuleInit {
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async cleanDatabaseRecords(): Promise<void> {
    await this.db.delete(user);
    await this.db.delete(product);
    await this.db.delete(setting);
    await this.db.delete(category);
    await this.db.delete(role);
  }

  async populateRoles(roles: Role[]): Promise<void> {
    await this.db.insert(role).values(roles).onConflictDoNothing();
  }

  async populateUsers(users: User[]): Promise<void> {
    await this.db.insert(user).values(users).onConflictDoNothing();
  }

  async populateCategories(categories: Category[]): Promise<void> {
    await this.db.insert(category).values(categories).onConflictDoNothing();
  }

  async populateProducts(products: Product[]): Promise<void> {
    await this.db.insert(product).values(products).onConflictDoNothing();
  }

  async populateSettings(settings: Setting[]): Promise<void> {
    await this.db.insert(setting).values(settings).onConflictDoNothing();
  }
}
