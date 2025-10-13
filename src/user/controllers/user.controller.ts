import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { UpdateUserDto, UpdateUserPasswordDto } from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { IUserService } from 'src/utils/interfaces/IUserService';

@Controller(Controllers.user)
export class UserController {
  constructor(
    @Inject(Services.user) private readonly userService: IUserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getUserProfile(@Req() req: Request) {
    return await this.userService.findOne(req.user._uuid, false);
  }

  @UseGuards(AuthGuard)
  @Patch('/')
  async updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUser(req.user._uuid, dto);
    return res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(AuthGuard)
  @Patch('/password')
  async updateUserPassword(
    @Req() req: Request,
    @Body() dto: UpdateUserPasswordDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserPassword(req.user._uuid, dto);
    return res.sendStatus(HttpStatus.OK);
  }
}
