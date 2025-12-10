import { PaginationDetails, UpdateCategoryDetails } from './../types';
import { CreateCategoryDetails } from '../types';
import { ProductCategoryEntity } from '../typeorm';
import { CategoryDetails, RootCategoriesDetail } from '../dto';

export interface ICategoryService {
  createCategory(
    this: void,
    userId: string,
    details: CreateCategoryDetails,
  ): Promise<void>;
  getRootCategories(
    this: void,
    details: PaginationDetails,
  ): Promise<RootCategoriesDetail>;
  getChildrenByParentId(
    this: void,
    uuid: string,
    getAllSubcategories: boolean,
  ): Promise<CategoryDetails[]>;
  getCategoryById(
    this: void,
    uuid: string,
    isCanCreateProduct: boolean,
  ): Promise<ProductCategoryEntity>;
  removeCategory(
    this: void,
    categoryId: string,
    isRemoveAll: boolean,
  ): Promise<void>;
  getSubcategoriesList(this: void, uuid: string): Promise<CategoryDetails[]>;
  updateCategory(userid: string, details: UpdateCategoryDetails): Promise<void>;
}
