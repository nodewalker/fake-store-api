import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from './../../utils/security/password';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/const';
import { IAuthService, IUserService } from 'src/utils/interfaces';
import { UserEntity } from 'src/utils/typeorm';
import { CreateUserDetails, JWTPayload, LoginDetails } from 'src/utils/types';
import { Config } from 'src/utils/Config';
import {
  JwtTokensDetails,
  ReturnCreateUserDetails,
  TokensDetails,
} from 'src/utils/dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.user) private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async signup(details: CreateUserDetails): Promise<TokensDetails> {
    const user: ReturnCreateUserDetails =
      await this.userService.createUser(details);
    return plainToInstance(
      TokensDetails,
      this.generateJwtTokens(
        plainToInstance(JwtTokensDetails, user, {
          excludeExtraneousValues: true,
        }),
      ),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async signin(details: LoginDetails): Promise<TokensDetails> {
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
    return plainToInstance(
      TokensDetails,
      this.generateJwtTokens(
        plainToInstance(JwtTokensDetails, user, {
          excludeExtraneousValues: true,
        }),
      ),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async refreshTokens(refreshToken: string): Promise<TokensDetails> {
    const user: JwtTokensDetails = await this.verifyUser(refreshToken);
    return plainToInstance(
      TokensDetails,
      this.generateJwtTokens(
        plainToInstance(JwtTokensDetails, user, {
          excludeExtraneousValues: true,
        }),
      ),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async verifyUser(token: string): Promise<JwtTokensDetails> {
    try {
      const payload: JWTPayload = this.jwtService.verify(token);
      const user: UserEntity | null = await this.userService.findOne(
        payload.sub,
      );
      if (!user?._uuid)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return plainToInstance(JwtTokensDetails, user, {
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

  private generateJwtTokens(user: JwtTokensDetails): TokensDetails {
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
