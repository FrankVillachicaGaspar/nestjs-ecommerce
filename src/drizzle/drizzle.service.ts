import { createClient } from '@libsql/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private db: LibSQLDatabase;
  private tursoDatabaseUrl: string;
  private tursoAuthToken: string;

  constructor(private configService: ConfigService) {
    this.tursoDatabaseUrl = configService.get('tursoDatabaseUrl');
    this.tursoAuthToken = configService.get('tursoAuthToken');
  }

  onModuleInit() {
    const client = createClient({
      url: this.tursoDatabaseUrl,
      authToken: this.tursoAuthToken,
    });
    this.db = drizzle(client);
  }

  getClient() {
    if (!this.db) throw new Error('database connection is missing');
    return this.db;
  }
}
