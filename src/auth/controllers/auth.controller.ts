import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { Controllers, Services } from 'src/utils/const';
import { LoginDto, CreateUserDto } from 'src/utils/dto';
import { IAuthService } from 'src/utils/interfaces';

@Controller(Controllers.auth)
export class AuthController {
  constructor(
    @Inject(Services.auth) private readonly authService: IAuthService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: LoginDto) {
    return await this.authService.signin(dto);
  }

  @Post('refresh')
  refresh(@Query('rt') refreshToken: string) {
    if (!refreshToken?.trim()) {
      throw new HttpException(
        'Refresh token must not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.authService.refreshTokens(refreshToken);
  }
}
