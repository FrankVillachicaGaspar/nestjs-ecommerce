import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsEmail()
  @MaxLength(30)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/,
    {
      message:
        'the password must be between 8 and 20 characters, include at least one uppercase letter and one special character',
    },
  )
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly lastName: string;

  @IsNotEmpty()
  @MinLength(9)
  @Matches(/^\+51\s9\d{8}$/, {
    message:
      "the phone number is not valid. It should start with '+51', followed by a space and a Peruvian mobile number that begins with '9', and should consist of a total of 9 digits.",
  })
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly roleId: number;
}
