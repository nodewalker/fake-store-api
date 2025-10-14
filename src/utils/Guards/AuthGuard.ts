import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Services } from '../const';
import { IAuthService } from '../interfaces';
import { UserRequest } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Services.auth) private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const bearerToken = request.headers.authorization;
    if (!bearerToken || bearerToken.split(' ')[0] !== 'Bearer')
      throw new HttpException(
        'Unauthorised user (empty bearer token)',
        HttpStatus.UNAUTHORIZED,
      );

    const user: UserRequest = await this.authService.verifyUser(
      bearerToken.split(' ')[1],
    );
    if (!user._uuid)
      throw new HttpException('Unauthorised user', HttpStatus.UNAUTHORIZED);

    request.user = user;
    return true;
  }
}
