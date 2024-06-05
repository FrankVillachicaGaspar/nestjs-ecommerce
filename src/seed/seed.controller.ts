import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Public()
  @Get('populate')
  async populate() {
    return await this.seedService.populate();
  }
}
