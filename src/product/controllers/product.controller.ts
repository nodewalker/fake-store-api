import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Controllers, Services } from 'src/utils/const';
import { GetProductsDto } from 'src/utils/dto';
import { IProductService } from 'src/utils/interfaces';

@Controller(Controllers.product)
export class ProductController {
  constructor(
    @Inject(Services.product) private readonly productServcie: IProductService,
  ) {}

  // TEST: TRY TO SORT
  @Get('/')
  async getProducts(@Query() dto: GetProductsDto) {
    return await this.productServcie.getProducts(dto);
  }

  @Get('/:id')
  getOneById(@Param('id', new ParseIntPipe()) id: string) {
    return this.productServcie.getProductById(id);
  }

  // TODO:
  @Post('/')
  createProduct() {}
}
