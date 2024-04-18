import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly lastName: string;

  @IsNotEmpty()
  @MinLength(9)
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly roleId: number;
}
