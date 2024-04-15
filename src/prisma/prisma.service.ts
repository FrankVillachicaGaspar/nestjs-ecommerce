import { createClient } from '@libsql/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit {
  private prisma: PrismaClient;
  private tursoDatabaseUrl: string;
  private tursoDatabaseToken: string;

  constructor(private readonly configService: ConfigService) {
    this.tursoDatabaseUrl = configService.get<string>('tursoDatabaseUrl');
    this.tursoDatabaseToken = configService.get<string>('tursoDatabaseToken');
  }

  async onModuleInit() {
    const libsql = createClient({
      url: this.tursoDatabaseUrl,
      authToken: this.tursoDatabaseToken,
    });
    const adapter = new PrismaLibSQL(libsql);
    this.prisma = new PrismaClient({ adapter });
    await this.prisma.$connect();
  }

  getClient(): PrismaClient {
    if (!this.prisma) throw new Error('Prisma client is not initialized');
    return this.prisma;
  }
}
