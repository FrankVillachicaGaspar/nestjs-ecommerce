import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateSettingDataDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
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
