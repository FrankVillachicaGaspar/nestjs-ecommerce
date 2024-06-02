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
        .insert(schema.user)
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
        .from(schema.user)
        .get();

      const pagination = calculatePaginationData(totalItems, limit, page);

      const userListDb: User[] = await this.db.query.user.findMany({
        with: {
          role: true,
        },
        limit,
        offset: calculateOffset(limit, page),
      });

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
      const userDb: User = await this.db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, id),
        with: { role: true },
      });

      if (!userDb) throw new NotFoundException(`User with id ${id} not found.`);

      return userDb;
    } catch (error) {
      handleDrizzleErrors(error, 'user', this.logger);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.findById(id);

      const updatedUser: User = await this.db
        .update(schema.user)
        .set({
          ...updateUserDto,
          modifiedAt: new Date().toISOString(),
        })
        .where(eq(schema.user.id, id))
        .returning()
        .get();

      return updatedUser;
    } catch (error) {
      handleDrizzleErrors(error, 'user', this.logger);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const userDb: User = await this.db
        .delete(schema.user)
        .where(eq(schema.user.id, id))
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
