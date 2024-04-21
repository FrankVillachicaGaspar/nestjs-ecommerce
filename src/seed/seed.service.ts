import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { category, product, role, user } from 'drizzle/schema';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { rolesDataMock } from './mock/role.mock';
import { categoriesDataMock } from './mock/category.mock';
import { usersDataMock } from './mock/users.mock';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { ConfigService } from '@nestjs/config';
import constantsUtils from 'src/common/utils/constants.utils';
import { productsDataMock } from './mock/product.mock';
import { Category } from 'src/category/interfaces/category.interface';
import { eq } from 'drizzle-orm';

@Injectable()
export class SeedService implements OnModuleInit {
  private db: BetterSQLite3Database | LibSQLDatabase;
  private readonly environment: string;

  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly configService: ConfigService,
  ) {
    this.environment = configService.get('environment');
  }

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async populate() {
    if (this.environment !== constantsUtils.DEVELOPMENT)
      throw new BadRequestException(
        `Seed failed. The seed can only executed in development mode.`,
      );

    try {
      // Truncate tables
      await this.db.delete(user);
      await this.db.delete(role);

      await this.db.delete(product);
      await this.db.delete(category);

      // Insert mock data

      await this.db.insert(role).values(rolesDataMock).onConflictDoNothing();

      await this.db
        .insert(category)
        .values(categoriesDataMock)
        .onConflictDoNothing();

      await this.db.insert(user).values(usersDataMock).onConflictDoNothing();

      productsDataMock.forEach(async (productMock) => {
        const categoryDB: Category = await this.db
          .select()
          .from(category)
          .where(eq(category.id, productMock.categoryId))
          .get();

        if (categoryDB) {
          await this.db
            .insert(product)
            .values(productMock)
            .onConflictDoNothing();
        }
      });

      return { message: 'seed executed successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `database error: ${error.message}`,
      );
    }
  }
}
