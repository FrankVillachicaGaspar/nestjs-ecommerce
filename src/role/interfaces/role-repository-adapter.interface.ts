import { Role } from './role.interface';

export interface RoleRepository {
  findAll(): Promise<Role[]>;
}
