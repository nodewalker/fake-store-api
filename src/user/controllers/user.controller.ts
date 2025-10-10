import { Controller, Inject } from '@nestjs/common';
import { Controllers, Services } from 'src/utils/const';
import { IUserService } from 'src/utils/interfaces/IUserService';

@Controller(Controllers.user)
export class UserController {
  constructor(
    @Inject(Services.user) private readonly userService: IUserService,
  ) {}
}
