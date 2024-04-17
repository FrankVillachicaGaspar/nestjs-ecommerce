import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @Transform(({ value }) => (value as string).toLocaleLowerCase())
  readonly name: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  readonly desc: string;
}
