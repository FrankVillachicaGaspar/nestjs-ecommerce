import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SettingDataService } from './setting-data.service';
import { CreateSettingDataDto } from './dto/create-setting-data.dto';
import { UpdateSettingDataDto } from './dto/update-setting-data.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('setting-data')
export class SettingDataController {
  constructor(private readonly settingDataService: SettingDataService) {}

  @Post()
  create(@Body() createSettingDataDto: CreateSettingDataDto) {
    return this.settingDataService.create(createSettingDataDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.settingDataService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.settingDataService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSettingDataDto: UpdateSettingDataDto,
  ) {
    return this.settingDataService.update(id, updateSettingDataDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.settingDataService.remove(id);
  }
}
