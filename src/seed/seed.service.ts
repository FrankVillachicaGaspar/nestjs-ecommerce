import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { rolesDataMock } from './mock/role.mock';
import { generateCategories } from './mock/category.mock';
import { generateUsers } from './mock/users.mock';
import { ConfigService } from '@nestjs/config';
import constantsUtils from 'src/common/utils/constants.utils';
import { generateProducts } from './mock/product.mock';
import { DrizzleSeedRepository } from './repositories/drizzle-seed.repository';
import { settingDataMock } from './mock/setting.mock';

@Injectable()
export class SeedService {
  private readonly environment: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly seedRepository: DrizzleSeedRepository,
  ) {
    this.environment = configService.get('environment');
  }

  async populate() {
    if (this.environment !== constantsUtils.DEVELOPMENT)
      throw new BadRequestException(
        `Seed failed. The seed can only executed in development mode.`,
      );

    try {
      await this.seedRepository.cleanDatabaseRecords();

      const users = generateUsers(30);
      const categories = generateCategories(24);
      const products = generateProducts(30);

      await this.seedRepository.populateRoles(rolesDataMock);
      await this.seedRepository.populateUsers(users);
      await this.seedRepository.populateCategories(categories);
      await this.seedRepository.populateProducts(products);
      await this.seedRepository.populateSettings(settingDataMock);

      return { message: 'seed executed successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `database error: ${error.message}`,
      );
    }
  }
}
