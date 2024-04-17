import { createClient } from '@libsql/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import * as Database from 'better-sqlite3';
import {
  BetterSQLite3Database,
  drizzle as localDrizzle,
} from 'drizzle-orm/better-sqlite3';
import { DEVELOPMENT } from 'src/common/utils/constants.utils';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private db: LibSQLDatabase;
  private tursoDatabaseUrl: string;
  private tursoAuthToken: string;
  private localDatabaseUrl: string;
  private environment: string;
  private localDb: BetterSQLite3Database;

  constructor(private readonly configService: ConfigService) {
    this.tursoDatabaseUrl = configService.get('tursoDatabaseUrl');
    this.tursoAuthToken = configService.get('tursoAuthToken');
    this.environment = configService.get('environment');
    this.localDatabaseUrl = configService.get('localDatabaseUrl');
  }

  onModuleInit() {
    const sqlite = new Database(this.localDatabaseUrl);
    this.localDb = localDrizzle(sqlite);

    const client = createClient({
      url: this.tursoDatabaseUrl,
      authToken: this.tursoAuthToken,
    });
    this.db = drizzle(client);
  }

  getClient() {
    if (!this.db) throw new Error('database connection is missing');

    if (this.environment === DEVELOPMENT) return this.localDb;

    return this.db;
  }
}
