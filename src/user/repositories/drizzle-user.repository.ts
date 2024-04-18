import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { UserRepositoryAdapter } from '../interfaces/user-repository-adapter.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { user } from 'drizzle/schema';
import { eq } from 'drizzle-orm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export default class DrizzleUserRepository
  implements UserRepositoryAdapter, OnModuleInit
{
  private readonly logger = new Logger(DrizzleUserRepository.name);
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
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
    } catch (error) {
      this.handleErrors(error);
    }
    return userDb;
  }

  async findAll(): Promise<User[]> {
    let userListDb: User[];
    try {
      userListDb = await this.db.select().from(user).all();
    } catch (error) {
      this.handleErrors(error);
    }
    return userListDb;
  }

  async findById(id: number): Promise<User> {
    let userDb: User;

    try {
      userDb = await this.db.select().from(user).where(eq(user.id, id)).get();
    } catch (error) {
      this.handleErrors(error);
    }

    if (!userDb) throw new NotFoundException(`User with id ${id} not found.`);

    return userDb;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let userDb: User;

    try {
      userDb = await this.db
        .update(user)
        .set({ ...updateUserDto })
        .where(eq(user.id, id))
        .returning()
        .get();
    } catch (error) {
      this.handleErrors(error);
    }

    if (!userDb)
      throw new BadRequestException(
        `Update failed. User with id ${id} not found.`,
      );

    return userDb;
  }

  async remove(id: number): Promise<void> {
    let userDb: User;
    try {
      userDb = await this.db
        .delete(user)
        .where(eq(user.id, id))
        .returning()
        .get();
    } catch (error) {
      this.handleErrors(error);
    }
    if (!userDb)
      throw new BadRequestException(
        `Delete failed!. The user with id ${id} not found.`,
      );
  }

  handleErrors(error: any) {
    this.logger.fatal(error);

    if (error.message.includes('UNIQUE constraint'))
      throw new BadRequestException(`the user already exist`);

    throw new InternalServerErrorException(error);
  }
}
