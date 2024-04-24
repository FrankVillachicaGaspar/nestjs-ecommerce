import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { SettingRepository } from '../interfaces/setting-adapter.interface';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { Setting } from '../interfaces/setting.interfaces';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { setting } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleSettingRepository
  implements SettingRepository, OnModuleInit
{
  private readonly logger = new Logger(DrizzleSettingRepository.name);
  private db: BetterSQLite3Database | LibSQLDatabase;

  constructor(private drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient();
  }

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    let settingDb: Setting;
    try {
      settingDb = await this.db
        .insert(setting)
        .values({
          ...createSettingDto,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();
    } catch (error) {
      this.handleErrors(error);
    }
    return settingDb;
  }

  async getAll(): Promise<Setting[]> {
    let settingListDb: Setting[];
    try {
      settingListDb = await this.db.select().from(setting).all();
    } catch (error) {
      this.handleErrors(error);
    }
    return settingListDb;
  }

  async getById(id: number): Promise<Setting> {
    let settingDb: Setting;
    try {
      settingDb = await this.db
        .select()
        .from(setting)
        .where(eq(setting.id, id))
        .get();
    } catch (error) {
      this.handleErrors(error);
    }
    if (!settingDb)
      throw new NotFoundException(`Setting whit id ${id} not found!`);
    return settingDb;
  }

  async update(
    id: number,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    let settingDb: Setting;
    try {
      settingDb = await this.db
        .update(setting)
        .set({
          ...updateSettingDto,
          modifiedAt: new Date().toISOString(),
        })
        .where(eq(setting.id, id))
        .returning()
        .get();
    } catch (error) {
      this.handleErrors(error);
    }
    if (!settingDb)
      throw new BadRequestException(
        `Update failed. Setting with id ${id} not found`,
      );
    return settingDb;
  }

  async remove(id: number): Promise<void> {
    let settingDb: Setting;
    try {
      settingDb = await this.db
        .delete(setting)
        .where(eq(setting.id, id))
        .returning()
        .get();
    } catch (error) {
      this.handleErrors(error);
    }
    if (!settingDb)
      throw new BadRequestException(
        `Delete failed!.Setting with id ${id} not found`,
      );
  }

  handleErrors(error: any) {
    if (error.message.includes('UNIQUE constraint'))
      throw new BadRequestException(`The product already exist`);

    this.logger.fatal(error);
    throw new InternalServerErrorException(error);
  }
}
