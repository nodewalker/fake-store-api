import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
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
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  CartDetails,
  PaginationQueryDto,
  SelectCartItemDto,
} from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { ICartService } from 'src/utils/interfaces';

export class CartController {
  protected cartService: ICartService;
  constructor(cartService: ICartService) {
    this.cartService = cartService;
  }

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
  @Get('/cart')
  @HttpCode(HttpStatus.OK)
  async getCart(@Query() dto: PaginationQueryDto, @Req() req: Request) {
    return await this.cartService.getUserCart(req.user._uuid, dto);
  }

  @ApiOperation({ summary: 'Add product to user cart' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'pid',
    description: 'Product id',
    type: String,
    required: true,
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
  @Post('/cart')
  async addProductToUserCart(
    @Req() req: Request,
    @Query('pid', new ParseUUIDPipe())
    productId: string,
    @Res() res: Response,
  ) {
    await this.cartService.addProductToUserCart(req.user._uuid, productId);
    return res.sendStatus(HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Remove products from user cart' })
  @ApiBearerAuth()
  @ApiBody({
    type: SelectCartItemDto,
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
  @Delete('/cart')
  async removeProductFromCart(
    @Req() req: Request,
    @Body() dto: SelectCartItemDto,
    @Res() res: Response,
  ) {
    await this.cartService.removeProductFromUserCart(req.user._uuid, dto);
    return res.sendStatus(HttpStatus.OK);
  }
}
