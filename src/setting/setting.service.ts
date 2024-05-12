import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { DrizzleSettingRepository } from './repositories/drizzle-setting.repository';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { GetSettingDto } from './dto/get-setting.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';

@Injectable()
export class SettingsService {
  constructor(
    private readonly settingRepository: DrizzleSettingRepository,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<GetSettingDto> {
    const setting = await this.settingRepository.create(createSettingDto);
    return this.dtoConverter.plainToDto(GetSettingDto, setting);
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<FindAllResponse<GetSettingDto[]>> {
    const result = await this.settingRepository.getAll(paginationQueryDto);

    const settingListDto = result.data.map((setting) =>
      this.dtoConverter.plainToDto(GetSettingDto, setting),
    );

    return {
      data: settingListDto,
      pagination: result.pagination,
    };
  }

  async findOne(id: number): Promise<GetSettingDto> {
    const setting = await this.settingRepository.getById(id);
    return this.dtoConverter.plainToDto(GetSettingDto, setting);
  }

  async findOneGetFull(id: number): Promise<GetSettingDto> {
    const setting = await this.settingRepository.getByIdFull(id);
    return this.dtoConverter.plainToDto(GetSettingDto, setting);
  }

  async update(
    id: number,
    updateSettingDto: UpdateSettingDto,
  ): Promise<GetSettingDto> {
    const setting = await this.settingRepository.update(id, updateSettingDto);
    return this.dtoConverter.plainToDto(GetSettingDto, setting);
  }

  async remove(id: number): Promise<void> {
    await this.settingRepository.remove(id);
  }
}
