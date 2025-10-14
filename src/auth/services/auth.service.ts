import { plainToInstance } from 'class-transformer';
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
  Tokens,
} from 'src/utils/types';
import { Config } from 'src/utils/Config';
import { CreateJwtTokensDetails, ReturnCreateUserDetails } from 'src/utils/dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.user) private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async signup(details: CreateUserDetails): Promise<Tokens> {
    const user: ReturnCreateUserDetails =
      await this.userService.createUser(details);
    return this.generateJwtTokens(
      plainToInstance(CreateJwtTokensDetails, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async signin(details: LoginDetails): Promise<Tokens> {
    const user: UserEntity | null = await this.userService.findOne(
      details.login,
    );
    if (
      !user?._uuid ||
      (user?._uuid && !(await verifyPassword(details.password, user.password)))
    )
      throw new HttpException(
        'The login or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    return this.generateJwtTokens(user);
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const user: CreateJwtTokensDetails = await this.verifyUser(refreshToken);
    return this.generateJwtTokens(user);
  }

  async verifyUser(token: string): Promise<CreateJwtTokensDetails> {
    try {
      const payload: JWTPayload = this.jwtService.verify(token);
      const user: UserEntity | null = await this.userService.findOne(
        payload.sub,
      );
      if (!user?._uuid)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return plainToInstance(CreateJwtTokensDetails, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
      }
      if (error.name === 'JsonWebTokenError') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Token verification failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private generateJwtTokens(user: CreateJwtTokensDetails): Tokens {
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
