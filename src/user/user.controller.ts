import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Get()
  async getAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.userService.getAll(paginationQueryDto);
  }

  @Patch()
  async update() {}

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    await this.userService.remove(id);
  }
}
