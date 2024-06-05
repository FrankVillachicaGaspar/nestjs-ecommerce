import { IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @MinLength(5)
  emailOrUsername: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
