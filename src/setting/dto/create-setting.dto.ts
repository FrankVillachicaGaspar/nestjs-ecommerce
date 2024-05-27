import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { NoSpaces } from 'src/common/validations/no-spaces.validation';

export class CreateSettingDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @NoSpaces()
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  desc: string;
}
