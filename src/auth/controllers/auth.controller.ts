import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controllers, Services } from 'src/utils/const';
import { LoginDto, CreateUserDto, TokensDetails } from 'src/utils/dto';
import { IAuthService } from 'src/utils/interfaces';

@ApiTags('Auth')
@Controller(Controllers.auth)
export class AuthController {
  constructor(
    @Inject(Services.auth) private readonly authService: IAuthService,
  ) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User registered success',
    type: TokensDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @Post('signup')
  @UseInterceptors(NoFilesInterceptor())
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User login success',
    type: TokensDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @Post('signin')
  @UseInterceptors(NoFilesInterceptor())
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: LoginDto) {
    return await this.authService.signin(dto);
  }

  @ApiOperation({ summary: 'Refresh auth tokens' })
  @ApiQuery({
    name: 'rt',
    required: true,
    type: String,
    description: 'Refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Refresh tokens success',
    type: TokensDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Query('rt') refreshToken: string) {
    if (!refreshToken?.trim()) {
      throw new HttpException(
        'Refresh token must not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.authService.refreshTokens(refreshToken.trim());
  }
}
