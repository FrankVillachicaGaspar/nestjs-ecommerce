import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DrizzleProductRepository } from './repositories/drizzle-product.repository';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { GetProductDto } from './dto/get-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: DrizzleProductRepository,
    private readonly dtoConverter: DtoConverter,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);

    return this.dtoConverter.plainToDto(GetProductDto, product);
  }

  async findAll() {
    const productList = await this.productRepository.findAll();

    const productDtoList = productList.map((product) =>
      this.dtoConverter.plainToDto(GetProductDto, product),
    );

    return productDtoList;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findById(id);

    return this.dtoConverter.plainToDto(GetProductDto, product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.update(id, updateProductDto);

    return this.dtoConverter.plainToDto(GetProductDto, product);
  }

  async remove(id: number) {
    await this.productRepository.remove(id);
  }
}
