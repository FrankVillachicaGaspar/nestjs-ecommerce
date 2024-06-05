import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/constants/roles.constants';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(Role.MASTER)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
}
