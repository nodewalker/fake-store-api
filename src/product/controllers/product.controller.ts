import { Controller, Get, Inject, Post } from '@nestjs/common';
import { Controllers, Services } from 'src/utils/const';
import { IProductService } from 'src/utils/interfaces';

@Controller(Controllers.product)
export class ProductController {
  constructor(
    @Inject(Services.product) private readonly productServcie: IProductService,
  ) {}

  @Get('/')
  getList() {}

  @Get('/:id')
  getOneById() {}

  @Post('/')
  createProduct() {}
}
