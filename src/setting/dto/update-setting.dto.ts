import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  code: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  desc: string;
}
