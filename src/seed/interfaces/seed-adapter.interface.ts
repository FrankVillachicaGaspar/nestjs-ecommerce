import { Category } from 'src/category/interfaces/category.interface';
import { Role } from './role.interface';
import { Product } from 'src/product/interfaces/product.interface';
import { User } from 'src/user/interfaces/user.interface';
import { Setting } from 'src/setting/interfaces/setting.interfaces';

export interface SeedRepository {
  cleanDatabaseRecords(): Promise<void>;

  populateRoles(roles: Role[]): Promise<void>;

  populateUsers(users: User[]): Promise<void>;

  populateCategories(categories: Category[]): Promise<void>;

  populateProducts(products: Product[]): Promise<void>;

  populateSettings(settings: Setting[]): Promise<void>;
}
