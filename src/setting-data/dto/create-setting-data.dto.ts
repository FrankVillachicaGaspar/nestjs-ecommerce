import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";
import { NoSpaces } from "src/common/validations/no-spaces.validation";

export class CreateSettingDataDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @NoSpaces()
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  desc: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  value: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @IsPositive()
  settingId: number;
}
