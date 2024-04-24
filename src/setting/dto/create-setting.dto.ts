import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  desc: string;
}
