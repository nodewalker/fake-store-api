import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { CartDetails, PaginationQueryDto, CartItemsDto } from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { ICartService } from 'src/utils/interfaces';

@ApiTags('cart')
@Controller(Controllers.cart)
export class CartController {
  constructor(
    @Inject(Services.cart) private readonly cartService: ICartService,
  ) {}

  @ApiOperation({ summary: 'Get user cart' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User cart recived',
    type: CartDetails,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @UseGuards(AuthGuard)
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getCart(@Query() dto: PaginationQueryDto, @Req() req: Request) {
    return await this.cartService.getUserCart(req.user._uuid, dto);
  }

  @ApiOperation({ summary: 'Add product to user cart' })
  @ApiBearerAuth()
  @ApiBody({
    type: CartItemsDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success added',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @UseGuards(AuthGuard)
  @Post('/')
  async addProductToUserCart(
    @Req() req: Request,
    @Body() dto: CartItemsDto,
    @Res() res: Response,
  ) {
    await this.cartService.addProductToUserCart(req.user._uuid, dto);
    return res.status(HttpStatus.OK).json({ msg: 'success' });
  }

  @ApiOperation({ summary: 'Remove products from user cart' })
  @ApiBearerAuth()
  @ApiBody({
    type: CartItemsDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success removed',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Check response message',
  })
  @ApiResponse({
    status: '5XX',
    description: 'Server error',
  })
  @UseGuards(AuthGuard)
  @Delete('/')
  async removeProductFromCart(
    @Req() req: Request,
    @Body() dto: CartItemsDto,
    @Res() res: Response,
  ) {
    await this.cartService.removeProductFromUserCart(req.user._uuid, dto);
    return res.status(HttpStatus.OK).json({ msg: 'success' });
  }
}
