import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SettingsService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/constants/roles.constants';

@Controller('setting')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Roles(Role.MASTER)
  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.settingsService.findAll(paginationQueryDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.settingsService.findOne(id);
  }

  @Public()
  @Get('get-full/:id')
  findOneGetFull(@Param('id', new ParseIntPipe()) id: number) {
    return this.settingsService.findOneGetFull(id);
  }

  @Roles(Role.MASTER)
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Roles(Role.MASTER)
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.settingsService.remove(id);
  }
}
