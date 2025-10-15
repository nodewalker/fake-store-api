import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { ICartService } from 'src/utils/interfaces';

@Controller(Controllers.cart)
export class CartController {
  constructor(
    @Inject(Services.cart) private readonly cartService: ICartService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getCart(@Req() req: Request) {
    return await this.cartService.getUserCart(req.user._uuid);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async addProductToUserCart(
    @Req() req: Request,
    @Query('pid') productId: string,
    @Res() res: Response,
  ) {
    await this.cartService.addProductToUserCart(req.user._uuid, productId);
    return res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async removeProductFromCart(
    @Req() req: Request,
    @Query('pid') productId: string,
    @Res() res: Response,
  ) {
    await this.cartService.removeProductFromUserCart(req.user._uuid, productId);
    return res.sendStatus(HttpStatus.OK);
  }
}
