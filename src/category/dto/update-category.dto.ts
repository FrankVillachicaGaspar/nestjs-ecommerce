import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  readonly name: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  readonly desc: string;
}
