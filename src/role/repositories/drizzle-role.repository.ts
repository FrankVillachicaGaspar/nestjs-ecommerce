import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RoleRepository } from '../interfaces/role-repository-adapter.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from 'drizzle/schema';
import { handleDrizzleErrors } from 'src/common/errors/drizzle.error';
import { Role } from '../interfaces/role.interface';

@Injectable()
export class DrizzleRoleRepository implements RoleRepository, OnModuleInit {
  private db: LibSQLDatabase<typeof schema>;
  private readonly logger = new Logger(DrizzleRoleRepository.name);

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient(
      DrizzleRoleRepository.name,
    ) as LibSQLDatabase<typeof schema>;
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.db.select().from(schema.role);
    } catch (error) {
      handleDrizzleErrors(error, 'role', this.logger);
    }
  }
}
