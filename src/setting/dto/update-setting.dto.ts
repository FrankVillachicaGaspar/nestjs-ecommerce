import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { NoSpaces } from 'src/common/validations/no-spaces.validation';

export class UpdateSettingDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @NoSpaces()
  code: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  desc: string;
}
