import { ProductCategoryEntity } from '../typeorm';
import { CreateCategoryDetails, GetCategoriesReturn } from '../types';

export interface ICategoryService {
  createCategory(userId: string, details: CreateCategoryDetails): Promise<void>;
  getAllCategories(
    name: string,
    limit: number,
    page: number,
  ): Promise<GetCategoriesReturn>;
  findOne(name: string): Promise<ProductCategoryEntity | null>;
}
