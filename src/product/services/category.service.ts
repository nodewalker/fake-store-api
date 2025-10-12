import { Injectable } from '@nestjs/common';
import { ICategoryService } from 'src/utils/interfaces';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor() {}
}
