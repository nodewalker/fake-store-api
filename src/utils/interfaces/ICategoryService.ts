import { PaginationDetails } from './../types';
import { CreateCategoryDetails, GetCategoriesReturn } from '../types';

export interface ICategoryService {
  createCategory(userId: string, details: CreateCategoryDetails): Promise<void>;
  getAllCategories(details: PaginationDetails): Promise<GetCategoriesReturn>;
}
