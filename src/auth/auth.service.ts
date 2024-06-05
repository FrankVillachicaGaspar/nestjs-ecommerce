import { Injectable, UnauthorizedException } from '@nestjs/common';
import DrizzleUserRepository from 'src/user/repositories/drizzle-user.repository';
import { SignInDto } from './dto/sign-in.dto';
import { DtoConverter } from 'src/common/providers/dto-converter.provider';
import { comparePassword } from 'src/common/utils/bcrypt.utils';
import { SignInResult } from './dto/sign-in-result.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Payload } from './interfaces/payload.interface';
import { GetShortUserDto } from 'src/user/dto/get-short-user.dto';

@Injectable()
export class AuthService {
  private jwtSecret: string;
  constructor(
    private readonly userRepository: DrizzleUserRepository,
    private readonly dtoConverter: DtoConverter,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.jwtSecret = config.get('JWT_SECRET');
  }

  async signIn(signInDto: SignInDto): Promise<SignInResult> {
    const user = await this.userRepository.findByEmailOrUsername(
      signInDto.emailOrUsername,
    );

    if (!user || !comparePassword(signInDto.password, user.password))
      throw new UnauthorizedException('Wrong username, email or password');

    const payload: Payload = {
      id: user.id,
      username: user.username,
    };

    return {
      user: this.dtoConverter.plainToDto(GetShortUserDto, user),
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.jwtSecret,
      }),
    };
  }
}
