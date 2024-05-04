import { createClient } from '@libsql/client';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import * as Database from 'better-sqlite3';
import {
  BetterSQLite3Database,
  drizzle as localDrizzle,
} from 'drizzle-orm/better-sqlite3';
import constantsUtils from 'src/common/utils/constants.utils';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private db: LibSQLDatabase;
  private tursoDatabaseUrl: string;
  private tursoAuthToken: string;
  private localDatabaseUrl: string;
  private environment: string;
  private localDb: BetterSQLite3Database;
  private logger = new Logger(DrizzleService.name);

  constructor(private readonly configService: ConfigService) {
    this.tursoDatabaseUrl = configService.get('tursoDatabaseUrl');
    this.tursoAuthToken = configService.get('tursoAuthToken');
    this.environment = configService.get('environment');
    this.localDatabaseUrl = configService.get('localDatabaseUrl');
  }

  onModuleInit() {
    if (this.environment === constantsUtils.PRODUCTION) {
      const client = createClient({
        url: this.tursoDatabaseUrl,
        authToken: this.tursoAuthToken,
      });

      this.db = drizzle(client);
    } else {
      const sqlite = new Database(this.localDatabaseUrl);

      this.localDb = localDrizzle(sqlite);
    }
  }

  /**
   * Return the database connection.
   * - The className parameter is the class name when this method is calling.
   *
   * Example: getClient(ExampleRepository.name)
   * @param className string
   * @returns BetterSQLite3Database | LibSQLDatabase
   */
  getClient(className: string) {
    if (this.environment === constantsUtils.DEVELOPMENT) {
      this.logger.log(
        `Local database is successfully connected in ${className}`,
      );
      return this.localDb;
    }

    if (!this.db) throw new Error('database connection is missing');
    return this.db;
  }
}
