import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  desc: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;
}
