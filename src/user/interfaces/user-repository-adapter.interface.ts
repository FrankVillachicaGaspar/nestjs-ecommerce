import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from './user.interface';

export interface UserRepositoryAdapter {
  create(createUserDto: CreateUserDto): Promise<User>;

  findById(id: number): Promise<User>;

  findAll(): Promise<User[]>;

  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;

  remove(id: number): Promise<void>;
}
