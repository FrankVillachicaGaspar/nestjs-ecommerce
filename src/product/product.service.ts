import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DrizzleProductRepository } from './repositories/drizzle-product.repository';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { GetProductDto } from './dto/get-product.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: DrizzleProductRepository,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<GetProductDto> {
    const product = await this.productRepository.create(createProductDto);

    return this.dtoConverter.plainToDto(GetProductDto, product);
  }

  async findAll(
    pagination: PaginationQueryDto,
  ): Promise<FindAllResponse<GetProductDto[]>> {
    const result = await this.productRepository.findAll(pagination);

    const productDtoList = result.data.map((product) =>
      this.dtoConverter.plainToDto(GetProductDto, product),
    );

    return {
      data: productDtoList,
      pagination: result.pagination,
    };
  }

  async findOne(id: number): Promise<GetProductDto> {
    const product = await this.productRepository.findById(id);

    return this.dtoConverter.plainToDto(GetProductDto, product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<GetProductDto> {
    const product = await this.productRepository.update(id, updateProductDto);

    return this.dtoConverter.plainToDto(GetProductDto, product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.remove(id);
  }
}
