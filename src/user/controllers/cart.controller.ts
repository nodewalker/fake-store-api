import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
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
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Controllers, Services } from 'src/utils/const';
import { CartDetails, PaginationQueryDto } from 'src/utils/dto';
import { AuthGuard } from 'src/utils/Guards/AuthGuard';
import { ICartService } from 'src/utils/interfaces';

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

  @ApiOperation({ summary: 'Remove product from user cart' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'pid',
    description: 'Product id',
    type: String,
    required: true,
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
    @Query('pid', new ParseUUIDPipe()) productId: string,
    @Res() res: Response,
  ) {
    await this.cartService.removeProductFromUserCart(req.user._uuid, productId);
    return res.sendStatus(HttpStatus.OK);
  }
}
