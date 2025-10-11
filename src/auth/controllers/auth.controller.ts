import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { LoginDto, CreateUserDto } from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
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

  @UseGuards(AuthGuard)
  @Get('status')
  status(@Req() req: Request) {
    return req.user;
  }

  @Post('refresh')
  refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }
}
