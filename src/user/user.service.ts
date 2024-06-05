import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import DrizzleUserRepository from './repositories/drizzle-user.repository';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';
import { encryptPassword } from 'src/common/utils/bcrypt.utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: DrizzleUserRepository,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
    createUserDto = {
      ...createUserDto,
      password: encryptPassword(createUserDto.password),
    };

    const user = await this.userRepository.create(createUserDto);

    return this.dtoConverter.plainToDto(GetUserDto, user);
  }

  async findOne(id: number): Promise<GetUserDto> {
    const user = await this.userRepository.findById(id);

    return this.dtoConverter.plainToDto(GetUserDto, user);
  }

  async getAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<FindAllResponse<GetUserDto[]>> {
    const result = await this.userRepository.findAll(paginationQueryDto);

    const userDtoList = result.data.map((user) =>
      this.dtoConverter.plainToDto(GetUserDto, user),
    );

    return {
      data: userDtoList,
      pagination: result.pagination,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    const user = await this.userRepository.update(id, updateUserDto);

    return this.dtoConverter.plainToDto(GetUserDto, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.remove(id);
  }
}
