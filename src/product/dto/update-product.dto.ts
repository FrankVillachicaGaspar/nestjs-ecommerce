import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  desc: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  categoryId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;
}
