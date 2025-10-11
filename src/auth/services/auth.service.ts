import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from './../../utils/security/password';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/const';
import { IAuthService, IUserService } from 'src/utils/interfaces';
import { UserEntity } from 'src/utils/typeorm';
import {
  CreateUserDetails,
  JWTPayload,
  LoginDetails,
  ReturnUserDetails,
  Tokens,
} from 'src/utils/types';
import { Config } from 'src/utils/Config';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.user) private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async signup(details: CreateUserDetails): Promise<Tokens> {
    const user: ReturnUserDetails = await this.userService.createUser(details);
    return this.generateJwtTokens(user);
  }

  async signin(details: LoginDetails): Promise<Tokens> {
    const user: UserEntity = (await this.userService.findOne(
      details.login,
      true,
    )) as UserEntity;
    if (!(await verifyPassword(details.password, user.password)))
      throw new HttpException('', HttpStatus.BAD_REQUEST);

    return this.generateJwtTokens(user);
  }

  async verifyUser(token: string): Promise<ReturnUserDetails> {
    try {
      const payload: JWTPayload = this.jwtService.verify(token);
      const user: ReturnUserDetails = (await this.userService.findOne(
        payload.sub,
        false,
      )) as ReturnUserDetails;
      return user;
    } catch (error) {
      throw new HttpException(
        error as string,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const user: ReturnUserDetails = await this.verifyUser(refreshToken);
    if (!user)
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);

    return this.generateJwtTokens(user);
  }

  private generateJwtTokens(user: UserEntity | ReturnUserDetails): Tokens {
    return {
      access_token: this.jwtService.sign(
        {
          sub: user._uuid,
        },
        { expiresIn: Config.JWT.ACCESS_TOKEN_EXPIRES },
      ),
      refresh_token: this.jwtService.sign(
        {
          sub: user._uuid,
        },
        { expiresIn: Config.JWT.REFRESH_TOKEN_EXPIRES },
      ),
    };
  }
}
