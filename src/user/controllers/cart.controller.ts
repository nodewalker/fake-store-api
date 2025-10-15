import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { PaginationQueryDto } from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { ICartService } from 'src/utils/interfaces';

@Controller(Controllers.cart)
export class CartController {
  constructor(
    @Inject(Services.cart) private readonly cartService: ICartService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getCart(@Query() dto: PaginationQueryDto, @Req() req: Request) {
    return await this.cartService.getUserCart(req.user._uuid, dto);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async addProductToUserCart(
    @Req() req: Request,
    @Query('pid', new ParseUUIDPipe())
    productId: string,
    @Res() res: Response,
  ) {
    await this.cartService.addProductToUserCart(req.user._uuid, productId);
    return res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(AuthGuard)
  @Delete('/')
  async removeProductFromCart(
    @Req() req: Request,
    @Query('pid', new ParseUUIDPipe()) productId: string,
    @Res() res: Response,
  ) {
    await this.cartService.removeProductFromUserCart(req.user._uuid, productId);
    return res.sendStatus(HttpStatus.OK);
  }
}
