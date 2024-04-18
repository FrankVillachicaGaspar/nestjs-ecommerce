import { Injectable, OnModuleInit } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { user } from 'drizzle/schema';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

@Injectable()
export class UserService implements OnModuleInit {
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async create(createUserDto: CreateUserDto) {
    let userDb: User;
    try {
      userDb = await this.db
        .insert(user)
        .values({
          ...createUserDto,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();
    } catch (error) {}
    return userDb;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
