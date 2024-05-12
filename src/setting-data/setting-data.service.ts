import { Injectable } from '@nestjs/common';
import { CreateSettingDataDto } from './dto/create-setting-data.dto';
import { UpdateSettingDataDto } from './dto/update-setting-data.dto';
import { DrizzleSettingDataRepository } from './repository/drizzle-setting-data.repository';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { GetSettingDataDto } from './dto/get-setting-data.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import { DrizzleSettingRepository } from 'src/setting/repositories/drizzle-setting.repository';

@Injectable()
export class SettingDataService {
  constructor(
    private readonly settingDataRepository: DrizzleSettingDataRepository,
    private readonly dtoConverter: DtoConverter,
    private readonly settingRepository: DrizzleSettingRepository,
  ) {}

  async create(
    createSettingDataDto: CreateSettingDataDto,
  ): Promise<GetSettingDataDto> {
    await this.settingRepository.getById(createSettingDataDto.settingId);

    const settingData =
      await this.settingDataRepository.create(createSettingDataDto);

    return this.dtoConverter.plainToDto(GetSettingDataDto, settingData);
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<FindAllResponse<GetSettingDataDto[]>> {
    const { data, pagination } =
      await this.settingDataRepository.findAll(paginationQueryDto);

    const settingDataListDto = data.map((d) =>
      this.dtoConverter.plainToDto(GetSettingDataDto, d),
    );

    return {
      data: settingDataListDto,
      pagination,
    };
  }

  async findOne(id: number): Promise<GetSettingDataDto> {
    const settingData = await this.settingDataRepository.findById(id);

    return this.dtoConverter.plainToDto(GetSettingDataDto, settingData);
  }

  async update(
    id: number,
    updateSettingDataDto: UpdateSettingDataDto,
  ): Promise<GetSettingDataDto> {
    await this.settingRepository.getById(updateSettingDataDto.settingId);

    const settingData = await this.settingDataRepository.update(
      id,
      updateSettingDataDto,
    );

    return this.dtoConverter.plainToDto(GetSettingDataDto, settingData);
  }

  async remove(id: number): Promise<void> {
    await this.settingDataRepository.remove(id);
  }
}
