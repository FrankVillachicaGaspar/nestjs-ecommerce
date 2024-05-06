import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from './product.interface';
import { FindAllResponse } from 'src/common/interfaces/find-all-response.dto';

export interface ProductRepository {
  create(createProductDto: CreateProductDto): Promise<Product>;
  findById(id: number): Promise<Product>;
  findAll(pagination: PaginationQueryDto): Promise<FindAllResponse<Product[]>>;
  update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  remove(id: number): Promise<void>;
}
