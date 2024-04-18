import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { category, role, user } from 'drizzle/schema';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { rolesDataMock } from './mock/role.mock';
import { categoriesDataMock } from './mock/category.mock';
import { usersDataMock } from './mock/users.mock';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

@Injectable()
export class SeedService implements OnModuleInit {
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async populate() {
    try {
      await this.db.delete(role);
      await this.db.delete(category);
      await this.db.delete(user);

      await this.db.insert(role).values(rolesDataMock).onConflictDoNothing();
      await this.db
        .insert(category)
        .values(categoriesDataMock)
        .onConflictDoNothing();
      await this.db.insert(user).values(usersDataMock).onConflictDoNothing();

      return { message: 'seed executed successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `database error: ${error.message}`,
      );
    }
  }
}
