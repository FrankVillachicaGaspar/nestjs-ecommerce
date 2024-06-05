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
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/constants/roles.constants';

@Controller('setting-data')
export class SettingDataController {
  constructor(private readonly settingDataService: SettingDataService) {}

  @Roles(Role.MASTER)
  @Post()
  create(@Body() createSettingDataDto: CreateSettingDataDto) {
    return this.settingDataService.create(createSettingDataDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.settingDataService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.settingDataService.findOne(id);
  }

  @Roles(Role.MASTER, Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSettingDataDto: UpdateSettingDataDto,
  ) {
    return this.settingDataService.update(id, updateSettingDataDto);
  }

  @Roles(Role.MASTER)
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.settingDataService.remove(id);
  }
}
