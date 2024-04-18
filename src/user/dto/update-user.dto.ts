import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly username: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  readonly password: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly lastName: string;

  @IsOptional()
  @MinLength(9)
  readonly phoneNumber: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly roleId: number;
}
