import { verifyPassword } from './../../utils/security/password';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/const';
import { IAuthService, IUserService } from 'src/utils/interfaces';
import { UserEntity } from 'src/utils/typeorm';
import {
  CreateUserDetails,
  LoginDetails,
  ReturnUserDetails,
  Tokens,
} from 'src/utils/types';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.user) private readonly userService: IUserService,
  ) {}

  async signup(details: CreateUserDetails): Promise<Tokens> {
    const user: ReturnUserDetails = await this.userService.createUser(details);
    // create auth tokens

    return { access_token: '', refresh_token: '' };
  }

  async signin(details: LoginDetails): Promise<Tokens> {
    const user: UserEntity = await this.userService.findOne(details.login);
    if (!(await verifyPassword(details.password, user.password)))
      throw new HttpException('', HttpStatus.BAD_REQUEST);

    return { access_token: '', refresh_token: '' };
  }
}
