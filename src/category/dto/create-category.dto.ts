import { IsString, MinLength } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @MinLength(2)
  readonly description: string;
}
