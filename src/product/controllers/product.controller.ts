import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Controllers, Services } from 'src/utils/const';
import { IProductService } from 'src/utils/interfaces';

@Controller(Controllers.product)
export class ProductController {
  constructor(
    @Inject(Services.product) private readonly productServcie: IProductService,
  ) {}

  @Get('/')
  async getProducts(
    @Query(
      'l',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        optional: true,
      }),
    )
    limit: number = 25,
    @Query(
      'p',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        optional: true,
      }),
    )
    page: number = 1,
    @Query('c') categoryName?: string,
  ) {
    return await this.productServcie.getProducts(limit, page, categoryName);
  }

  @Get('/:id')
  getOneById(@Param('id', new ParseIntPipe()) id: string) {
    return this.productServcie.getProductById(id);
  }

  @Post('/')
  createProduct() {}
}
