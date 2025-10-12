import { Controller, Inject } from '@nestjs/common';
import { Controllers, Services } from 'src/utils/const';
import { ICategoryService } from 'src/utils/interfaces';

@Controller(Controllers.category)
export class CategoryController {
  constructor(
    @Inject(Services.category)
    private readonly categoryServcie: ICategoryService,
  ) {}
}
