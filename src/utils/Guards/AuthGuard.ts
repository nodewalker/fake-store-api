import {
  CanActivate,
  ExecutionContext,
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
    if (!bearerToken || bearerToken.split(' ')[0] !== 'Bearer') return false;

    const user: UserRequest = await this.authService.verifyUser(
      bearerToken.split(' ')[1],
    );
    if (!user._uuid) return false;

    request.user = user;
    return true;
  }
}
