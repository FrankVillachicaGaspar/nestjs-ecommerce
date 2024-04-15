import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<GetCategoryDto> {
    try {
      const category = await this.prismaService.getClient().category.create({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description,
        },
      });

      return plainToClass(GetCategoryDto, category, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    console.log(updateCategoryDto);
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  private handleErrors(error: any) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      throw new BadRequestException(`Category already exist.`);
    }
    throw new InternalServerErrorException('Unexpected error has occurred');
  }
}
