import { GetShortUserDto } from 'src/user/dto/get-short-user.dto';

export interface SignInResult {
  user: GetShortUserDto;
  access_token: string;
}
