import { Injectable } from '@nestjs/common';
import { DrizzleRoleRepository } from './repositories/drizzle-role.repository';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { Role } from './interfaces/role.interface';
import { GetRoleDto } from './dto/get-role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: DrizzleRoleRepository,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async findAll() {
    const roles: Role[] = await this.roleRepository.findAll();
    const roleDtoList: GetRoleDto[] = roles.map((r) =>
      this.dtoConverter.plainToDto(GetRoleDto, r),
    );
    return roleDtoList;
  }
}
