import { Body, Controller, Inject, Post } from '@nestjs/common';
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
}
