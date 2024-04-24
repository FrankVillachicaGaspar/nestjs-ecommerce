import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { DrizzleSettingRepository } from './repositories/drizzle-setting.repository';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { GetSettingDto } from './dto/get-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    private readonly settingRepository: DrizzleSettingRepository,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const setting = await this.settingRepository.create(createSettingDto);
    return this.dtoConverter.plainToDto(GetSettingDto, setting);
  }

  async findAll() {
    const settingList = await this.settingRepository.getAll();
    const settingListDto = settingList.map((setting) =>
      this.dtoConverter.plainToDto(GetSettingDto, setting),
    );
    return settingListDto;
  }

  async findOne(id: number) {
    const setting = await this.settingRepository.getById(id);
    return this.dtoConverter.plainToDto(GetSettingDto, setting);
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    const setting = await this.settingRepository.update(id, updateSettingDto);
    return this.dtoConverter.plainToDto(GetSettingDto, setting);
  }

  async remove(id: number) {
    await this.settingRepository.remove(id);
  }
}
