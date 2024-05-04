import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { rolesDataMock } from './mock/role.mock';
import { categoriesDataMock } from './mock/category.mock';
import { usersDataMock } from './mock/users.mock';
import { ConfigService } from '@nestjs/config';
import constantsUtils from 'src/common/utils/constants.utils';
import { productsDataMock } from './mock/product.mock';
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
      await this.seedRepository.populateRoles(rolesDataMock);
      await this.seedRepository.populateUsers(usersDataMock);
      await this.seedRepository.populateCategories(categoriesDataMock);
      await this.seedRepository.populateProducts(productsDataMock);
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
