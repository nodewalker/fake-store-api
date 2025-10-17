import { PaginationDetails } from './../types';
import { CreateCategoryDetails } from '../types';
import { ProductCategoryEntity } from '../typeorm';
import { CategoryDetails, RootCategoriesDetail } from '../dto';

export interface ICategoryService {
  createCategory(userId: string, details: CreateCategoryDetails): Promise<void>;
  getRootCategories(details: PaginationDetails): Promise<RootCategoriesDetail>;
  getChildrenByParentId(
    uuid: string,
    getAllSubcategories: boolean,
  ): Promise<CategoryDetails[]>;
  getCategoryById(
    uuid: string,
    isCanCreateProduct: boolean,
  ): Promise<ProductCategoryEntity>;
  removeCategory(categoryId: string, isRemoveAll: boolean): Promise<void>;
}
