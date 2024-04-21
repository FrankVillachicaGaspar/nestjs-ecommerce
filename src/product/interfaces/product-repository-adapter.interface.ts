import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from './product.interface';

export interface ProductRepository {
  create(createProductDto: CreateProductDto): Promise<Product>;
  findById(id: number): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  remove(id: number): Promise<void>;
}
