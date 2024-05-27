import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { NoSpaces } from 'src/common/validations/no-spaces.validation';

export class UpdateSettingDataDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @NoSpaces()
  code: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsOptional()
  desc: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsOptional()
  value: string;

  @IsNumber()
  @Min(1)
  @IsPositive()
  @IsOptional()
  settingId: number;
}
