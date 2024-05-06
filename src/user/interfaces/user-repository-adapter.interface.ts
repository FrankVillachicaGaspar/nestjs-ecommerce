import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from './user.interface';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';

export interface UserRepositoryAdapter {
  create(createUserDto: CreateUserDto): Promise<User>;

  findById(id: number): Promise<User>;

  findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<FindAllResponse<User[]>>;

  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;

  remove(id: number): Promise<void>;
}
