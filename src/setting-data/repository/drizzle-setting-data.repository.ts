import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  BadRequestException,
} from '@nestjs/common';
import { SettingDataRepository } from '../interfaces/setting-data-repository-adapter.interface';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import { CreateSettingDataDto } from '../dto/create-setting-data.dto';
import { UpdateSettingDataDto } from '../dto/update-setting-data.dto';
import { SettingData } from '../interfaces/setting-data.interface';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from 'drizzle/schema';
import { handleDrizzleErrors } from 'src/common/errors/drizzle.error';
import { count, eq } from 'drizzle-orm';
import {
  calculateOffset,
  calculatePaginationData,
} from 'src/common/utils/pagination.utils';
import { Setting } from 'src/setting/interfaces/setting.interfaces';

@Injectable()
export class DrizzleSettingDataRepository
  implements SettingDataRepository, OnModuleInit
{
  private readonly logger = new Logger(DrizzleSettingDataRepository.name);
  private db: LibSQLDatabase<typeof schema>;

  constructor(private readonly drizzleService: DrizzleService) {}

  onModuleInit() {
    this.db = this.drizzleService.getClient(
      DrizzleSettingDataRepository.name,
    ) as LibSQLDatabase<typeof schema>;
  }

  async create(
    createSettingDataDto: CreateSettingDataDto,
  ): Promise<SettingData> {
    let settingDataDb: SettingData;

    try {
      settingDataDb = await this.db
        .insert(schema.settingData)
        .values({
          ...createSettingDataDto,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'setting data', this.logger);
    }
    return settingDataDb;
  }

  async findById(id: number): Promise<SettingData> {
    let settingDataDb: SettingData;

    try {
      settingDataDb = await this.db
        .select()
        .from(schema.settingData)
        .where(eq(schema.settingData.id, id))
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'setting data', this.logger);
    }

    if (!settingDataDb) {
      throw new NotFoundException(`the setting data with id ${id} not found`);
    }

    return settingDataDb;
  }

  async findAll({
    limit,
    page,
  }: PaginationQueryDto): Promise<FindAllResponse<SettingData[]>> {
    try {
      const { totalItems } = await this.db
        .select({ totalItems: count() })
        .from(schema.settingData)
        .get();

      const pagination = calculatePaginationData(totalItems, limit, page);

      const settingDataListDb: SettingData[] = await this.db
        .select()
        .from(schema.settingData)
        .limit(limit)
        .offset(calculateOffset(limit, page))
        .all();

      return {
        pagination,
        data: settingDataListDb,
      };
    } catch (error) {
      handleDrizzleErrors(error, 'setting data', this.logger);
    }
  }

  async update(
    id: number,
    updateSettingDataDto: UpdateSettingDataDto,
  ): Promise<SettingData> {
    let settingDataDb: SettingData;
    try {
      settingDataDb = await this.db
        .update(schema.settingData)
        .set({
          ...updateSettingDataDto,
          modifiedAt: new Date().toISOString(),
        })
        .where(eq(schema.settingData.id, id))
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'setting data', this.logger);
    }
    if (!settingDataDb)
      throw new BadRequestException(
        `update failed!. Setting data with id ${id} not found`,
      );
    return settingDataDb;
  }

  async remove(id: number): Promise<void> {
    let settingDataDb: SettingData;
    try {
      settingDataDb = await this.db
        .delete(schema.settingData)
        .where(eq(schema.settingData.id, id))
        .returning()
        .get();
    } catch (error) {
      handleDrizzleErrors(error, 'setting data', this.logger);
    }
    if (!settingDataDb)
      throw new BadRequestException(
        `Delete failed!. The setting data with id ${id} not found.`,
      );
  }
}
