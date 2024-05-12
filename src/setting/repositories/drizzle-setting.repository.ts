import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { SettingRepository } from '../interfaces/setting-adapter.interface';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { Setting } from '../interfaces/setting.interfaces';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { setting } from 'drizzle/schema';
import { count, eq } from 'drizzle-orm';
import * as schema from 'drizzle/schema';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import {
  calculateOffset,
  calculatePaginationData,
} from 'src/common/utils/pagination.utils';
import { handleDrizzleErrors } from 'src/common/errors/drizzle.error';

@Injectable()
export class DrizzleSettingRepository
  implements SettingRepository, OnModuleInit
{
  private readonly logger = new Logger(DrizzleSettingRepository.name);
  private db: LibSQLDatabase<typeof schema>;

  constructor(private drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient(
      DrizzleSettingRepository.name,
    ) as LibSQLDatabase<typeof schema>;
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
      handleDrizzleErrors(error, 'setting', this.logger);
    }
    return settingDb;
  }

  async getAll({
    limit,
    page,
  }: PaginationQueryDto): Promise<FindAllResponse<Setting[]>> {
    try {
      const { totalItems } = await this.db
        .select({ totalItems: count() })
        .from(setting)
        .get();

      const pagination = calculatePaginationData(totalItems, limit, page);

      const settingListDb = await this.db
        .select()
        .from(setting)
        .limit(limit)
        .offset(calculateOffset(limit, page))
        .all();

      return {
        data: settingListDb,
        pagination,
      };
    } catch (error) {
      handleDrizzleErrors(error, 'setting', this.logger);
    }
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
      handleDrizzleErrors(error, 'setting', this.logger);
    }
    if (!settingDb)
      throw new NotFoundException(`Setting whit id ${id} not found!`);
    return settingDb;
  }

  async getByIdFull(id: number): Promise<Setting> {
    try {
      const settingDb: Setting = await this.db.query.setting.findFirst({
        where: (setting, { eq }) => eq(setting.id, id),
        with: {
          settingData: true,
        },
      });

      if (!settingDb)
        throw new NotFoundException(`setting with id ${id} not found`);

      return settingDb;
    } catch (error) {
      handleDrizzleErrors(error, 'setting', this.logger);
    }
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
      handleDrizzleErrors(error, 'setting', this.logger);
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
      handleDrizzleErrors(error, 'setting', this.logger);
    }
    if (!settingDb)
      throw new BadRequestException(
        `Delete failed!.Setting with id ${id} not found`,
      );
  }
}
