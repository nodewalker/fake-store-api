import { PaginationDetails } from './../types';
import { CreateCategoryDetails, GetCategoriesReturn } from '../types';
import { ProductCategoryEntity } from '../typeorm';

export interface ICategoryService {
  createCategory(userId: string, details: CreateCategoryDetails): Promise<void>;
  getRootCategories(details: PaginationDetails): Promise<GetCategoriesReturn>;
  getChildrenByParentId(uuid: string): Promise<ProductCategoryEntity[]>;
  getCategoryById(
    uuid: string,
    isCanCreateProduct: boolean,
  ): Promise<ProductCategoryEntity>;
}
