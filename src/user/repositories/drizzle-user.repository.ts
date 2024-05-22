import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { UserRepositoryAdapter } from '../interfaces/user-repository-adapter.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { user } from 'drizzle/schema';
import { count, eq } from 'drizzle-orm';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as schema from 'drizzle/schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import {
  calculateOffset,
  calculatePaginationData,
} from 'src/common/utils/pagination.utils';
import { handleDrizzleErrors } from 'src/common/errors/drizzle.error';

@Injectable()
export default class DrizzleUserRepository
  implements UserRepositoryAdapter, OnModuleInit
{
  private readonly logger = new Logger(DrizzleUserRepository.name);
  private db: LibSQLDatabase<typeof schema>;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient(
      DrizzleUserRepository.name,
    ) as LibSQLDatabase<typeof schema>;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userDb: User = await this.db
        .insert(user)
        .values({
          ...createUserDto,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();

      return userDb;
    } catch (error) {
      handleDrizzleErrors(error, 'user', this.logger);
    }
  }

  async findAll({
    limit,
    page,
  }: PaginationQueryDto): Promise<FindAllResponse<User[]>> {
    try {
      const { totalItems } = await this.db
        .select({ totalItems: count() })
        .from(user)
        .get();

      const pagination = calculatePaginationData(totalItems, limit, page);

      const userListDb = await this.db
        .select()
        .from(user)
        .limit(limit)
        .offset(calculateOffset(limit, page))
        .all();

      return {
        data: userListDb,
        pagination,
      };
    } catch (error) {
      handleDrizzleErrors(error, 'user', this.logger);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const userDb: User = await this.db
        .select()
        .from(user)
        .where(eq(user.id, id))
        .get();

      if (!userDb) throw new NotFoundException(`User with id ${id} not found.`);

      return userDb;
    } catch (error) {
      handleDrizzleErrors(error, 'user', this.logger);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userDb: User = await this.db
        .update(user)
        .set({ ...updateUserDto, modifiedAt: new Date().toISOString() })
        .where(eq(user.id, id))
        .returning()
        .get();

      if (!userDb)
        throw new BadRequestException(
          `Update failed. User with id ${id} not found.`,
        );

      return userDb;
    } catch (error) {
      handleDrizzleErrors(error, 'user', this.logger);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const userDb: User = await this.db
        .delete(user)
        .where(eq(user.id, id))
        .returning()
        .get();

      if (!userDb)
        throw new BadRequestException(
          `Delete failed!. The user with id ${id} not found.`,
        );
    } catch (error) {
      handleDrizzleErrors(error, 'user', this.logger);
    }
  }
}
